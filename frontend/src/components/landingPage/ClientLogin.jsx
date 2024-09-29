import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const ClientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <section className="flex flex-col items-center h-screen md:flex-row">
        <div className="hidden w-full h-screen bg-indigo-600 lg:block md:w-1/2 xl:w-2/3"></div>
        <div className="flex items-center justify-center w-full h-screen px-6 bg-white md:max-w-md lg:max-w-full md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
          <div className="w-full h-100">
            <Link to={`/`} className="font-medium hover:underline ">
              <Button className="bg-client-brown">Home</Button>
            </Link>
            <h1 className="mt-4 text-xl font-bold leading-tight md:text-2xl">
              Log in to your account
            </h1>
            <form className="mt-6 login" action="#" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="mt-2 text-right">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              {error && (
                <div className="font-bold text-red-600 error">{error}</div>
              )}
              <button
                type="submit"
                className="block w-full px-4 py-3 mt-6 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400"
              >
                Log In
              </button>
            </form>
            <hr className="w-full my-6 border-gray-300" />

            <p className="mt-8">
              Need an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientLogin;
