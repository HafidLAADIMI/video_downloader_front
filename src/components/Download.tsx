import Image from "next/image"
import axios from "axios"
import {useState, useEffect, useCallback} from "react"

interface Format {
    ext: string;
    filesize: number;
    format_id: string;
    format_note: string;
    resolution: string;
    title?: string;
}

interface DownloadProgress {
    progress: number;
    downloaded: number;
    total: number;
    speed: number;
}

//const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://video-downloader-back-two.vercel.app';
const BASE_URL = 'http://localhost:5000';

const Download = ({
                      isDownload,
                      formats,
                      thumbnail,
                      url
                  }: {
    isDownload: boolean;
    formats: Format[];
    thumbnail: string;
    url: string | File | null | undefined;
}) => {
    const [downloading, setDownloading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<DownloadProgress | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const yt_thumbnail = '/yt_thumbnail.jpg';

    //Purpose: Converts a number of bytes into a human-readable format (e.g., 1024 → 1 KB).
    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    //Purpose: Formats a download speed (in bytes per second) into a human-readable string (e.g., 1024 → 1 KB/s).
    const formatSpeed = (bytesPerSecond: number) => {
        return `${formatBytes(bytesPerSecond)}/s`;
    };

    // Create a download function that returns a Promise
    const initiateDownload = useCallback(async (
        video_format: string | undefined,
        url: string | File | null | undefined,
        currentSessionId: string
    ) => {
        if (!video_format || !url) return;

        const axiosInstance = axios.create({
            baseURL: BASE_URL,
            timeout: 6000000,
            withCredentials: false, // Important for CORS
            headers: {
                'Content-Type': 'application/json',
            }
        });

        try {
            console.log('Starting download with:', {
                url,
                video_format,
                session_id: currentSessionId
            });

            const response = await axiosInstance.post('/download', {
                url,
                video_format,
                session_id: currentSessionId
            }, {
                responseType: 'blob',
            });

            console.log('Download response received:', response.status);

            // Handle the response
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'video.' + formats.find(f => f.format_id === video_format)?.ext;
            if (contentDisposition) {
                const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (match) {
                    filename = match[1].replace(/['"]/g, '');
                }
            }

            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);

            return true;
        } catch (err) {
            console.error('Download error details:', err);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Error response:', err.response);
                    if (err.response.data instanceof Blob) {
                        const text = await err.response.data.text();
                        try {
                            const errorData = JSON.parse(text);
                            throw new Error(errorData.error || errorData.message || 'Download failed');
                        } catch (e) {
                            throw new Error(`Download failed: ${text}`);
                        }
                    }
                } else if (err.request) {
                    // The request was made but no response was received
                    throw new Error('No response received from server. Please check your connection.');
                }
            }
            throw new Error('Failed to download video. Please try again.');
        }
    }, [formats]);

    // Handle the download button click
    const handleDownload = async (video_format: string | undefined) => {
        const newSessionId = `download-${Date.now()}`;
        setSessionId(newSessionId);
        // @ts-ignore
        setDownloading(video_format);
        setError(null);
        setProgress(null);

        try {
            await initiateDownload(video_format, url, newSessionId);
        } catch (err) {
            console.error('Download failed:', err);
            setError(err instanceof Error ? err.message : 'Failed to download video');
        } finally {
            setDownloading(null);
            setSessionId(null);
        }
    };

    // Set up progress monitoring
    useEffect(() => {
        let eventSource: EventSource | null = null;

        if (sessionId && downloading) {
            const evtSource = new EventSource(`${BASE_URL}/progress/${sessionId}`);

            evtSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setProgress({
                        progress: data.progress,
                        downloaded: data.downloaded,
                        total: data.total,
                        speed: data.speed
                    });
                } catch (e) {
                    console.error('Error parsing progress data:', e);
                }
            };

            evtSource.onerror = (err) => {
                console.error('EventSource failed:', err);
                evtSource.close();
            };

            eventSource = evtSource;
        }

        return () => {
            if (eventSource) {
                eventSource.close();
                setProgress(null);
            }
        };
    }, [sessionId, downloading]);

    return (
        <div
            className={`${isDownload ? "flex transition-all duration-200 " : "hidden"} flex-col h-full w-full gap-5 items-center justify-center lg:w-1/2`}>
            <div className="h-0.5 w-full bg-sky-500"/>
            {error && (
                <div className="w-full px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            <div className="h-full w-full flex items-center justify-center relative">
                <Image
                    src={thumbnail ? thumbnail : yt_thumbnail}
                    height={500}
                    width={500}
                    alt='thumbnail'
                    className="h-[70%] w-[70%] object-contain"
                />
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                {formats?.map((item, i) => (
                    <div className="flex flex-col h-full w-full gap-4 px-4" key={i}>
                        <div className="flex flex-col w-full gap-2">
                            <div className="flex flex-row justify-between items-center h-full w-full">
                                <p className="text-xl font-serif">
                                    {item?.format_note}.{item?.ext}
                                </p>
                                <button
                                    onClick={() => handleDownload(item?.format_id)}
                                    disabled={downloading !== null}
                                    className={`h-14 rounded-lg w-28 flex items-center justify-center font-serif shadow-lg shadow-white/30
                                        ${downloading === item.format_id
                                        ? "bg-sky-700 cursor-wait"
                                        : downloading !== null
                                            ? "bg-sky-300 cursor-not-allowed"
                                            : "bg-sky-500 hover:bg-sky-600"
                                    }`}
                                >
                                    {downloading === item.format_id ? "Downloading..." : "Download"}
                                </button>
                            </div>
                            {downloading === item.format_id && progress && (
                                <div className="w-full">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div
                                            className="bg-sky-600 h-2.5 rounded-full transition-all duration-200"
                                            style={{width: `${progress.progress}%`}}
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm mt-1 text-gray-500">
                                        <span>{formatBytes(progress.downloaded)} / {formatBytes(progress.total)}</span>
                                        <span>{formatSpeed(progress.speed)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="h-[1px] w-full bg-sky-800"/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Download;