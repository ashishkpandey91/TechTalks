import Logo from "./Logo";
// import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  // const navigate = useNavigate()
  const navItem = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: true,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: true,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: true,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: true,
  }
  ]
  return (
    <header className="from-background/10 via-background/50 to-background/80 fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b px-4 backdrop-blur-xl">
        <Logo />
        <div className="mr-12">
          <ul className="flex ml-auto gap-6">
              {
                navItem.map((item) => (
                  (item.active ? (
                    <li>{item.name}</li>
                  ) : null)
                ))
              }
          </ul>
        </div>
    </header>
  );
}
