import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link to={"/"}><h1 className=" cursor-pointer text-2xl md:text-2xl font-bold  tracking-wide">
      TechTalks
    </h1></Link>
  );
}

export default Logo;
