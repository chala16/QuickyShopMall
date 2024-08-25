import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import CreateRouter  from "./routers/router.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import 'flowbite/dist/flowbite.min.css';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify"

const router = CreateRouter(); 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthContextProvider>
  </React.StrictMode>
);
