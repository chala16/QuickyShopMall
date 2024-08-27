import React from "react";
import Logo from "../../../images/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { Avatar, Dropdown } from "flowbite-react";
import DarkMode from "./DarkMode";
import profile from "../../../images/profile-img2.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogout } from "../../../hooks/useLogout";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const showSuccess = () => {
    toast.info("Logout successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const handleClick = () => {
    logout();
    showSuccess();
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-40 duration-200 bg-white shadow-md dark:bg-gray-900 dark:text-white">
      {/* upper Navbar */}
      <div className="py-2 bg-client-yellow ">
        <div className="container flex items-center justify-between ">
          <div>
            <a href="#" className="flex gap-2 font-bold text - 2xl sm:text-3xl">
              <img src={Logo} alt="Logo" className="w-10 ml-20" />
              QuickShop
            </a>
          </div>

          {/* Hamburger Icon */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Page Links */}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row md:items-center md:gap-6 absolute md:relative left-0 w-full md:w-auto p-4 md:p-0 z-50`}
          >
            {user && user.userType === "shopOwner" && (
              <>
                <a
                  href="/shopOwner/dashboard"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Dashboard
                </a>
                <a
                  href="/client/inventory"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Inventory
                </a>
                <a
                  href="/shopOwner/discounts"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Discounts
                </a>
                <a
                  href="/client/feedbacks"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Feedbacks
                </a>
                <a
                  href="/client/report"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Report
                </a>
              </>
            )}

            {user && user.userType === "admin" && (
              <>
                <a
                  href="/client/dashboard"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Dashboard
                </a>
                <a
                  href="/client/shops"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Shops
                </a>
              </>
            )}

            {user && user.userType === "user" && (
              <>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Home
                </a>
                <a
                  href="/client/dashboard/manage"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Discounts
                </a>
                <a
                  href="/client/service"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Shops
                </a>
                <a
                  href="/wishlist"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Wishlist
                </a>
              </>
            )}

            {!user && (
              <>
                <a
                  href="/"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Home
                </a>
                <a
                  href="/login"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Discounts
                </a>
                <a
                  href="/login"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Shops
                </a>
                <a
                  href="/login"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Wishlist
                </a>
                <a
                  href="/client/dashboard/aboutus"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  About Us
                </a>
                <a
                  href="/client/dashboard/faq"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  FAQ
                </a>
              </>
            )}
          </div>

          {/* search bar and oder button */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative hidden group sm:block">
              <input
                type="text"
                placeholder="search"
                className="w-[200px] sm:w-[200px]
                group-hover:w-[300px] transitions-all
                duration-300 rounded-full border
                border-gray-300 px-2 py-1
                focus: outline-none focus:border-1
                focus:border-primary"
              />
              <IoMdSearch className="absolute text-gray-500 -translate-y-1/2 group-hover:text-primary top-1/2 right-3" />
            </div>

            {/* Darkmode */}
            <div>
              <DarkMode />
            </div>

            <div className="mr-4">
              {/* sign button */}
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="User settings" img={profile} rounded />}
              >
                {user && (
                  <div>
                    <Dropdown.Header>
                      <span className="block text-sm font-medium truncate">
                        {user.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item onClick={handleClick}>Log out</Dropdown.Item>
                    {user && user.userType === "admin" ? (
                      <Dropdown.Item href="/">Dashboard</Dropdown.Item>
                    ) : (
                      <Dropdown.Item href="/">Dashboard</Dropdown.Item>
                    )}
                  </div>
                )}
                {!user && (
                  <div>
                    <Dropdown.Item href="/login">Log In</Dropdown.Item>
                    <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
                  </div>
                )}
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      {/* lower Navbar */}
      <div></div>
    </div>
  );
};

export default Navbar;
