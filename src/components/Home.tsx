import { Button } from "./ui/button";
import { FaBlog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="h-screen w-screen bg-gradient-to-r from-violet-950 via-violet-500 to-violet-400  dark:bg-gradient-to-r dark:from-[#030712] dark:to-slate-900 flex flex-col gap-8 items-center justify-center">
      <FaBlog className="text-8xl text-white" />
      <h1 className="text-5xl text-white font-bold text-center px-3">Explore, Learn, and Innovate</h1>
      <Button variant={"outline" } className="select-none text-xl p-4" onClick={(()=> {navigate("/signup")})}>Create Your Blog</Button>
    </div>
    </>
  );
};

export default Home;
