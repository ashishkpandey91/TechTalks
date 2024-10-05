import Header from "../components/header/Header";
import { useEffect } from "react";
import CONF from "../conf";
import Login from "./pages/login";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const appwriteurl = import.meta.env.VITE_APPWRITE_URL;
  console.log(appwriteurl);

  useEffect(() => {
    console.log("Bucket Id", CONF.get("APPWRITE_BUCKET_ID"));
  });
  return (
    <>
      <Header />
      <div className="mt-28 flex justify-center items-center">
        <Login />
      </div>
      <Toaster />
    </>
  );
}

export default App;
