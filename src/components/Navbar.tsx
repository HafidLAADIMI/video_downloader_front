"use client"
import Image from "next/image"
import {useState} from "react";

const NavbarItems = () => {
    return (
        <ul className="flex flex-col gap-16 items-start justify-between text-3xl md:text-2xl md:flex-row md:gap-6 px-3 md:px-6 pt-10 md:pt-0   ">
            <li className={`cursor-pointer  font-serif`}>Home</li>
            <li className={`cursor-pointer  font-serif`}>Download</li>
            <li className={`cursor-pointer  font-serif`}>contact us</li>
        </ul>
    )
}
const Navbar = () => {
    const [open, setOpen] = useState(false)
    const logo = "/logo.png"
    return (
        <nav className="flex h-full items-center justify-center w-full px-3 lg:px-10 p-3 mb-8">
            <div className="shadow-inner shadow-sky-500 rounded-full">

                <Image src={logo} alt="logo" height={100} width={100}
                       className="h-16 w-20 object-contain cursor-pointer"/>
            </div>

            <div className="flex flex-1 justify-end  h-full  ">

                <div className="flex md:hidden z-20">
                    <button onClick={() => setOpen(!open)} className="flex flex-col gap-1 cursor-pointer">
                        <div
                            className={`h-1 w-7 bg-white transition-all duration-300 ${
                                open ? "rotate-45 translate-y-1.5" : ""
                            }`}
                        />
                        <div
                            className={`h-1 w-7 bg-white transition-all duration-300 ${
                                open ? "opacity-0" : ""
                            }`}
                        />
                        <div
                            className={`h-1 w-7 bg-white transition-all duration-300 ${
                                open ? "-rotate-45 -translate-y-1.5" : ""
                            }`}
                        />
                    </button>
                </div>

                <div className="hidden md:flex"><NavbarItems/>
                </div>
                <div
                    className={` absolute md:hidden top-16 left-0 w-full bg-black/70 bg-opacity-80 text-white transition-all duration-300 overflow-hidden z-30 shadow-lg shadow-sky-500/30 ${
                        open ? " min-h-full fixed overflow-hidden" : "max-h-0"
                    }`}
                >
                    <NavbarItems/>
                </div>
            </div>

        </nav>
    )
}
export default Navbar