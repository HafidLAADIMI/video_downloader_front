"use client"
import Image from "next/image";
import Usage from "@/components/Usage";
import usage from "../../public/usage"
import Description from "@/components/Description";
import Footer from "@/components/Footer";
import Download from "@/components/Download";
import {useState} from "react";

export default function Home() {
    const logo = "/logo.png"
    const [isDownload, setIsDownload] = useState(false)
    return (
        <div className="flex flex-col items-center justify-center pt-6 gap-10 w-full h-full ">
            <h1 className="text-3xl font-serif">HL video downloader</h1>
            <form className="flex flex-row h-full w-full items-center justify-center gap-1 ">
                <input
                    className=" border-cyan-700 border outline-none text-black h-16 w-[65%] md:w-[50%] lg:w-[40%] shadow-lg shadow-sky-500/70 rounded-lg px-4 text-xl"
                    placeholder="Paste the video link here"/>
                <button
                    className="bg-black shadow-inner rounded-full flex items-center justify-center shadow-sky-500/80 ">
                    <Image src={logo} height={100} width={100} alt="logo" className="h-20 w-20 object-contain "/>
                </button>
            </form>

            <div
                className={`${isDownload ? "hidden" : "flex"} flex-col gap-20  lg:flex-row lg:gap-1 h-full w-full pt-10 pb-5`}>
                {usage.map((item, i) => (
                    <Usage key={i} item={item}/>

                ))}
            </div>
            <Download isDownload={isDownload}/>
            <Description/>
            <Footer/>

        </div>
    );
}
