import { useAppSelector } from "@/store/hook";
import { Button } from "./ui/button";
import { FaBlog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AllPosts from "@/app/pages/AllPostsPage";

const Home = () => {
  const authStatus = useAppSelector((state) => state.auth.status);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-col items-center justify-center">
        <div className="h-screen w-screen bg-gradient-to-r from-violet-950 via-violet-500 to-violet-400  dark:bg-gradient-to-r dark:from-[#030712] dark:to-slate-900 flex flex-col gap-8 items-center justify-center">
          <FaBlog className="text-8xl text-white" />
          <h1 className="text-5xl text-white font-bold text-center px-3">
            Explore, Learn, and Innovate
          </h1>
          <Button
            variant={"outline"}
            className="select-none text-xl p-4"
            onClick={() => {
              if (!authStatus) {
                navigate("/signup");
              }else{
                navigate("/add-post")
              }
            }}
          >
            Create Your Blog
          </Button>
        </div>
        {authStatus && (
          <div className="bg-violet-700 dark:bg-slate-900 border-t-2 flex justify-center">
            <AllPosts />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
