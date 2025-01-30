import { Link } from "react-router-dom";

interface LogoProps {
  className?: string; // className is optional
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to={"/"}>
      <h1 className={`cursor-pointer text-[#121416] dark:text-gray-300 md:text-2xl font-bold tracking-wide ${className || 'text-2xl'}`}>
        TechTalks
      </h1>
    </Link>
  );
};

export default Logo;
