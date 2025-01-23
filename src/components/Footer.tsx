import Link from "next/link";
import {FaGithub, FaLinkedin, FaWhatsapp} from "react-icons/fa";


const Footer = () => {
    return (
        <footer id='footer' className="px-6 sm:px-16 pt-7 pb-3 border-t border-sky-500 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-500 flex gap-2">
                <p>Terms & Conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>

            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-sky-500 border border-black-200">
                    <Link className="h-full w-full items-center justify-center flex" href="https://github.com/HafidLAADIMI" >
                        {" "}
                        <FaGithub className="w-1/2 h-1/2 cursor-pointer" />
                    </Link>
                </div>
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-sky-500 border border-black-200">
                    <Link className="h-full w-full items-center justify-center flex" href="https://www.linkedin.com/in/hafid-laadimi-814b27258/">
                        {" "}
                        <FaLinkedin className="w-1/2 h-1/2 cursor-pointer" />
                    </Link>
                </div>
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-sky-500 border border-black-200">
                    <Link className="h-full w-full items-center justify-center flex"  href="https://wa.me/0669393996">
                        <FaWhatsapp  className="w-1/2 h-1/2 cursor-pointer" />
                    </Link>
                </div>
            </div>

            <p className="text-white-500">
                © 2025 HL video downloader. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;