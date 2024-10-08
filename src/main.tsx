import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
    </ThemeProvider>
  </StrictMode>
);
