import { FaArrowRight } from "react-icons/fa6";
import { Button } from "./ui/button";

function Side() {
  return (
    <>
      <div className="md:h-screen flex flex-col justify-center dark:bg-[#121416]">
        <div className="side1 flex flex-col lg:xl:flex-row py-16 justify-between items-center">
          <div className="side1-leftCont  lg:xl:px-8 flex lg:xl:ps-20 flex-col gap-2 md:gap-8  items-start  md:w-1/2 px-4">
            <h2 className="text-xl sm:text-2xl lg:text-4xl text-start tracking-wide  dark:text-white text-gray-800 font-bold lg:w-4/5 font-lato">
              Exploring the{" "}
              <span className="text-emerald-500">
                infinite possibilities of technology.
              </span>
            </h2>
            <p className=" hero-para  text-base  lg:xl:text-xl dark:text-white text-start font-lato mb-4 md:mb-0 Arya ga">
              Stay ahead in the world of innovation with insights, tutorials,
              and updates about all things tech. From coding to gadgets, we’ve
              got it covered.
            </p>
            {/* <Link href="docs/category/framework-components" target="_blank">
            <PrimaryButton name="Learn More" icon="/asset/arrow.svg" />
            </Link>  */}
            <Button
              //  onClick={() => {
              //    navigate("/signup");
              //  }}

              className={`bg-emerald-600 hover:bg-emerald-700 tracking-wider
                `}
            >
              Now More <FaArrowRight className="ml-2 text-xl font-bold" />
            </Button>
          </div>
          <img
            src="/Education.svg"
            width={10}
            height={10}
            alt=""
            className=" w-full md:w-[650px] mt-8"
          />
        </div>
      </div>
    </>
  );
}

export default Side;
