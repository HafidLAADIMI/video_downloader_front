"use client";

import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

const NavbarItems = () => {
    return (
        <ul className="flex flex-col md:flex-row gap-6 md:gap-10 items-center text-lg font-medium">
            <li className="cursor-pointer hover:text-sky-500 transition-colors duration-200"><Link
                href='#home'>Home</Link></li>
            <li className="cursor-pointer hover:text-sky-500 transition-colors duration-200"><Link
                href='#download'>Download</Link></li>
            <li className="cursor-pointer hover:text-sky-500 transition-colors duration-200"><Link href='#footer'>Contact
                Us</Link></li>
        </ul>
    );
};

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const logo = "/logo.png";

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md shadow-sky-500/30">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <Image
                    src={logo}
                    alt="logo"
                    height={50}
                    width={50}
                    className="h-12 w-12 object-contain cursor-pointer"
                />
                <span className="text-xl font-serif font-bold tracking-wide">HL Downloader</span>
            </div>

            {/* Navbar Links */}
            <div className="hidden md:flex">
                <NavbarItems/>
            </div>

            {/* Call-to-Action Button */}
            <div className="hidden md:flex">
                <button
                    className="px-6 py-2 bg-sky-500 text-white font-medium rounded-md shadow hover:bg-sky-600 transition-all duration-200">
                    <Link href='#home'> Get Started</Link>
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden">
                <button onClick={() => setOpen(!open)} className="flex flex-col gap-1">
                    <div
                        className={`h-1 w-7 bg-white transition-all duration-300 ${
                            open ? "rotate-45 translate-y-2" : ""
                        }`}
                    />
                    <div
                        className={`h-1 w-7 bg-white transition-all duration-300 ${
                            open ? "opacity-0" : ""
                        }`}
                    />
                    <div
                        className={`h-1 w-7 bg-white transition-all duration-300 ${
                            open ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute top-16 left-0 w-full bg-black text-white text-center transition-all duration-300 z-20 ${
                    open ? "max-h-screen py-6" : "max-h-0 overflow-hidden"
                }`}
            >
                <NavbarItems/>
                <button
                    className="mt-6 px-6 py-2 bg-sky-500 text-white font-medium rounded-md shadow hover:bg-sky-600 transition-all duration-200">
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
