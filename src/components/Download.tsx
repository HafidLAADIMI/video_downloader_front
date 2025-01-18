import Image from "next/image"

const Download = ({isDownload}: { isDownload: boolean }) => {
    const existing_formats = [
        "720.mp4", "360.mp4", "1080.mp4", "720.webm 🔇", "720.mp4 🔇", "480.webm 🔇", "480.mp4 🔇", "360.mp4 🔇", "360.webm 🔇"
    ]
    const thumbnail = "/thumbnail.jpeg"
    return (
        <div
            className={`${isDownload ? "flex" : "hidden "} flex-col h-full w-full gap-5 items-center justify-center lg:w-1/2`}>
            <div className="h-0.5 w-full bg-sky-500 "/>
            <div className="h-full w-full flex items-center justify-center relative ">
                <Image src={thumbnail} height={500} width={500} alt='thumbnail'
                       className="h-[70%] w-[70%] object-contain "/>
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full gap-4 ">
                {existing_formats.map((item, i) => (
                    <div className="flex flex-col h-full w-full gap-4 px-4 " key={i}>
                        <div className="flex flex-row justify-between items-center h-full w-full">
                            <p className="text-xl font-serif">{item}</p>
                            <button
                                className="h-14 bg-sky-500 rounded-lg w-28 flex items-center justify-center font-serif  shadow-lg shadow-white/30
                                "
                            >Download
                            </button>
                        </div>
                        <div className="h-[1px] w-full bg-sky-800"/>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Download