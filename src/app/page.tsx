"use client"
import Image from "next/image";
import Usage from "@/components/Usage";
import usage from "../../public/usage"
import Description from "@/components/Description";
import Footer from "@/components/Footer";
import Download from "@/components/Download";
import React, {useActionState} from "react";
import axios from "axios"
import Loading from "@/app/loading";

interface Format {
    "ext": string,
    "filesize": number,
    "format_id": string,
    "format_note": string,
    "resolution": string
}

interface Prev_state {
    formats: Format[],
    thumbnail: string,
    url: string | File | null | undefined
    is_download: boolean,
    error: any
}

export default function Home() {
    const logo = "/logo.png"

    async function list_format(prev_state: Prev_state, form_data: FormData) {
        try {
            const home=process.env.BACKEND_URL
            let url: { url: File | string | null };
            url = {"url": form_data.get("url")};
            const response = await axios.post(`http://localhost:5000/formats`, url,
                {
                    headers:
                        {
                            'Content-Type': 'application/json'
                        }
                }
            )
            console.log(response?.data)
            const formats = await response?.data?.formats?.formats
            const thumbnail = await response?.data?.formats?.thumbnail

            return {formats: formats, is_download: true, error: null, url: url.url, thumbnail: thumbnail}

        } catch (error) {
            console.log(error?.toString())
            return {error: error?.toString(), is_download: prev_state.is_download, format: prev_state.formats}
        }
    }

    // @ts-ignore
    const [state, action_function, loading] = useActionState(list_format,
        {
            formats: [],
            is_download: false,
            error: null
        })


    return (
        <div id="home" className="flex flex-col items-center justify-center pt-6 gap-10 w-full h-full ">
            <h1 className="text-3xl font-serif">HL video downloader</h1>
            <form action={action_function} className="flex flex-row h-full w-full items-center justify-center gap-1 ">
                <input
                    className=" border-cyan-700 border outline-none text-black h-16 w-[65%] md:w-[50%] lg:w-[40%] shadow-lg shadow-sky-500/70 rounded-lg px-4 text-xl"
                    placeholder="Paste the video link here" name="url"/>
                <button
                    type="submit"
                    className="bg-black shadow-inner rounded-full flex items-center justify-center shadow-sky-500/80 ">
                    <Image src={logo} height={100} width={100} alt="logo" className="h-20 w-20 object-contain "/>
                </button>
            </form>
            {!loading ? (
                    <div
                        className={`${state.is_download ? "hidden" : "flex"} flex-col gap-20  xl:flex-row xl:gap-1 h-full w-full pt-10 pb-5`}>
                        {usage.map((item, i) => (
                            <Usage key={i} item={item}/>

                        ))}
                    </div>
                ) :
                <Loading/>
            }
            <Download isDownload={state.is_download} formats={state.formats} url={state.url}
                      thumbnail={state.thumbnail}/>
            <Description/>
            <Footer/>

        </div>
    );
}
