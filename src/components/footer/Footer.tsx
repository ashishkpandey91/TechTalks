import { FaGithub, FaLinkedin } from "react-icons/fa6";
// import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Logo from "../header/Logo";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" px-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3 w-full border-t-[1px] pt-2 pb-3 dark:bg-[#121416]">
      <div className="sm:flex sm:items-center sm:gap-10">
        <div className="flex items-center gap-4 justify-center">
          <Logo className="text-sm" />
        </div>
        <p className="sm:border-l-2 border-emerald-600 md:pl-6 sm:py-2 text-xs md:text-base">
          © 2024 TechTalks
        </p>
      </div>
      <div className="text-2xl flex gap-10 md:gap-6 justify-center items-center md:pr-8">
        {/* <a href="https://github.com/" className="flex items-center gap-2 ">
          <FaGithub className="cursor-pointer text-3xl" />
          <div className="border-l-2 pl-4 border-emerald-600">
            <a href="https://github.com/ashishkpandey91" target="_blank">
              <p className="text-sm font-[500px] hover:text-emerald-600">Ashish Kr. Pandey</p>
            </a>
            <a href="https://github.com/srmahto" target="_blank">
              <p className="text-sm font-[500px] hover:text-emerald-600">Sudheer Kr. Mahto</p>
            </a>
          </div>
        </a> */}
        <a href="https://linkedin.com/in/">
          <FaLinkedin className="cursor-pointer" />
        </a>
        <a href="https://www.instagram.com//">
          <FaInstagramSquare className="cursor-pointer" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
