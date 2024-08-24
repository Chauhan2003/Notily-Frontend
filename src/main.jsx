import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotilyContextProvider from "./components/context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotilyContextProvider>
      <App />
    </NotilyContextProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);
