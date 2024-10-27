import { FaGithub } from "react-icons/fa6";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Logo from "../header/Logo";

const Footer = () => {
  return (
    <footer className=" px-4 flex flex-col sm:flex-row sm:justify-between items-center gap-3 w-full border-t-[1px] pt-2 border-gray-700 from-background/10 via-background/50 to-background/80 bg-gradient-to-b backdrop-blur-xl pb-3">
      <div className="sm:flex sm:items-center sm:gap-10">
        <div className="flex items-center gap-4 justify-center">
          <Logo className="text-sm" />
        </div>
        <p className="sm:border-l-2 md:pl-6 sm:py-2">
          © 2024 TechTalks
          <a href="https://github.com/ashishkpandey91" className="text-sm md:text-base"> —@ashishkpandey91</a>
        </p>
      </div>
      <div className="text-2xl flex gap-10 md:gap-6 justify-center items-center md:pr-8">
        <a href="https://github.com/ashishkpandey91">
          <FaGithub className="cursor-pointer" />
        </a>
        <a href="https://linkedin.com/in/ashishkpandey91">
          <FaLinkedin className="cursor-pointer" />
        </a>
        <a href="https://www.instagram.com/ashishpandeyatul/">
          <FaInstagramSquare className="cursor-pointer" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
