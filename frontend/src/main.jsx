import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import CreateRouter  from "./routers/router.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import 'flowbite/dist/flowbite.min.css';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify"
import firebase from "firebase/compat/app"

const firebaseConfig={
  apiKey: "AIzaSyBwsve0aEqNb2PMsqP-e-fIKPId8u3n87Y",
  authDomain: "quickyshop-e41a0.firebaseapp.com",
  projectId: "quickyshop-e41a0",
  storageBucket: "quickyshop-e41a0.appspot.com",
  messagingSenderId: "479381474012",
  appId: "1:479381474012:web:8c4567e7ab6dfe2fd24219"
};

firebase.initializeApp(firebaseConfig)

const router = CreateRouter(); 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthContextProvider>
  </React.StrictMode>
);
