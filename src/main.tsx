import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import createBrowserRouter and RouterProvider
import App from "./app/App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthLayout } from "./components/index.ts";
import LoginPage from "@/app/pages/LoginPage.tsx";
import SignupPage from "./app/pages/SignupPage.tsx";
import { Home } from "@/components/index.ts";
import CreatePost from "./app/pages/CreatePost.tsx";
import AllPosts from "./app/pages/AllPostsPage.tsx";
import Post from "./app/pages/Post.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <CreatePost />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
    },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);