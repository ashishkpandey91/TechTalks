import { FaGithub } from "react-icons/fa6";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Logo from "../header/Logo";

const Footer = () => {
  return (
    <footer className=" px-4 mt-20 mb-2 flex flex-col sm:flex-row sm:justify-between items-center gap-3 w-full border-t-[1px] pt-2 border-gray-700">
      <div className="sm:flex sm:items-center sm:gap-10">
        <div className="flex items-center gap-4 justify-center">
          <Logo />
        </div>
        <p className="sm:border-l-2 md:pl-6 sm:py-2">
          © 2024 EduSpy
          <a href="https://github.com/ashishkpandey91"> —@ashishkpandey91</a>
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
