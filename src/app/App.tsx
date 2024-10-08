import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { authService } from "@/appwrite/services";
import { login, logout } from "@/features/authSlice";
import Login from "./pages/login";

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }else{
        logout();
      }
    }).finally(() => setLoading(false));
  

  }, [])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-betweeno'>
      <div className='w-full block'>
        <Header />
        <main>
          <div className="mt-40 flex items-center justify-center">
            <Login />
          </div>
        
        </main>
      </div>
    </div>
  ) : null
}

export default App;
