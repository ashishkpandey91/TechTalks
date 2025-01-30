import { useAppSelector } from "@/store/hook";
import { Button } from "./ui/button";
import { FaBlog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AllPosts from "@/app/pages/AllPostsPage";
import Side from "@/components/SeccondHero"

const Home = () => {
  const authStatus = useAppSelector((state) => state.auth.status);
  const navigate = useNavigate();
  return (
    <>
      <div className="relative flex-col items-center justify-center bg-emerald-500 blur-0">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-25"
          src="/bg-video.mp4"
          autoPlay
          loop
          muted
        ></video>

        <div className="h-screen w-screen flex flex-col gap-8 items-center justify-center overflow-hidden relative">
          <FaBlog className="text-8xl text-white" />
          <h1 className="text-5xl text-white font-bold text-center px-3">
            Explore, Learn, and Innovate
          </h1>
          <Button
            variant={"outline"}
            className="select-none text-xl p-4 dark:bg-[#121416]"
            onClick={() => {
              if (!authStatus) {
                navigate("/signup");
              } else {
                navigate("/add-post");
              }
            }}
          >
            Create Your Blog
          </Button>
        </div>
        <div className="bg-gray-300">
        <Side />
        </div>
        {authStatus && (
          <div className="bg-gray-300 dark:bg-[#121416] border-t-2 flex justify-center">
            <AllPosts />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
