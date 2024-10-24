import { useEffect, useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { FaArrowRight } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { authService } from "@/appwrite/services";
import { logout } from "@/features/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const authStatus = useAppSelector((state) => state.auth.status);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function logoutHandler() {
    authService.logout().then(() => {
      dispatch(logout());
    });
  }

  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    // {
    //   name: "Signup",
    //   slug: "/signup",
    //   active: !authStatus,
    // },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="from-background/10 via-background/50 to-background/80 fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl">
      <Logo />
      <div className="md:mr-12  ">
        <div className="flex items-center justify-between">
          <ul
            className={` ${
              isOpen
                ? "  bg-white dark:bg-slate-950 absolute left-0 top-16 w-full items-center justify-center flex-col space-y-4 p-3 h-screen "
                : "  hidden md:flex items-center justify-center p-8 gap-16"
            }`}
          >
            {navItem.map((item) =>
              item.active ? (
                <li
                  key={item.name}
                  className={`${
                    isOpen
                      ? "select-none	transition ease-linear delay-100 text-base w-20 ml-4 font-bold text-left hover:text-violet-600"
                      : "dark:text-white text-base dark:hover:text-violet-600  transition ease-linear delay-100 font-semibold cursor-pointer text-black border-transparent px-1 border-b hover:text-violet-600 hover:border-b hover:border-violet-600 select-none	"
                  }`}
                  onClick={() => {
                    navigate(item.slug);
                  }}
                >
                  {item.name}
                </li>
              ) : null
            )}
            {!authStatus && (
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
                size={isOpen ? "lg" : "sm"}
                className={
                  isOpen
                    ? "tracking-wide text-lg w-full font-bold "
                    : "text-base"
                }
              >
                Get Started <FaArrowRight className="pl-2 text-2xl font-bold" />
              </Button>
            )}
            {authStatus && (
              <li
                className={`${
                  isOpen
                    ? "select-none	 transition ease-linear delay-100 text-base w-20 ml-4 font-bold text-left hover:text-violet-600"
                    : "dark:text-white text-base dark:hover:text-violet-600  transition ease-linear delay-100 font-semibold cursor-pointer text-black border-transparent px-1 border-b hover:text-violet-600 hover:border-b hover:border-violet-600 select-none	"
                }`}
                // onClick={logoutHandler}
              >
                <AlertDialog>
                  <AlertDialogTrigger>Logout</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure to Logout?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-400"
                        onClick={logoutHandler}
                      >
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            )}
          </ul>
          <div className="w-0 md:ml-0">
            <ModeToggle />
          </div>
        </div>
      </div>
      <button className="md:hidden select-none	" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </header>
  );
}
