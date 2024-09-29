import React, { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import SignupImg from "../../images/signup.jpg"

const ClientSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, isLoading } = useSignUp();
  const [userType, setUserType] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password, userType);
  };

  return (
    <div
    style={{
      height: "100vh",
      backgroundSize: "cover",
      backgroundImage: `url(${SignupImg})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
      <div className="max-w-screen-xl px-4 ml-[800px] sm:px-6 lg:px-8 pt-48">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold font-[poppins] text-center text-yellow-200 sm:text-3xl">
            Get started today
          </h1>

          <form
            onSubmit={handleSubmit}
            action="#"
            className="p-4 mb-0 space-y-4 rounded-lg shadow-lg signUp sm:p-6 lg:p-8"
          >
            <p className="text-2xl font-bold text-center font-[poppins]">Sign up</p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {error && (
              <div className="font-bold text-red-700 text-md error">
                {error}
              </div>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-purple-800"
            >
              Sign Up
            </button>

            <p className="font-bold text-center text-black text-md">
              Already have an account?
              <a className="ml-2 underline" href="/login">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientSignUp;
