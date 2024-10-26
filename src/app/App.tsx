import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { authService } from "@/appwrite/services";
import { login, logout } from "@/features/authSlice";
import Footer from "@/components/footer/Footer";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@/store/hook";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then(({ data }) => {
        if (data) {
          // console.log("user data: ", data);
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-betweeno scrollbar-none bg-violet-500 dark:bg-slate-900 overflow-x-hidden">
      <div className="w-full block">
        <Header />
        <main className="flex items-center justify-center w-full min-h-[calc(100vh-50px)] ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
