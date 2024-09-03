import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const useLogin = () => {
  const showSuccess = () => {
    toast.success('Successfully Login!',{
      position: "bottom-right",
      theme: "colored",
    });
  };
  const showError = () => {
    toast.error('Check your email & password!',{
      position: "bottom-right",
      theme: "colored",
    });
  };
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      showError();
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // Extract the token from the response
      const { token } = json;
      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      if (json.userType == "shopOwner") {
        navigate("/shopOwner/dashboard/view-items");
        showSuccess()
      } else {
        navigate("/");
        showSuccess()
      }
    }
  };
  return { login, isLoading, error };
};
