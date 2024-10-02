import React from "react";
import QuickyShop from "../../../images/QuickyShop.png";
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
import QuickyShopLogo from "../../../images/logoquickyshop.png";
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
            <a href="/" className="flex gap-2 font-bold text - 2xl sm:text-3xl">
              <img src={QuickyShopLogo} alt="Logo" className="ml-20 w-10 h-10" />
              <img src={QuickyShop} alt="Logo" className="ml-2 w-36 h-6 mt-3" />
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
                  href="/shopOwner/dashboard/add-item"
                  className="text-sm font-bold text-client-brown nav-link"
                >
                  Add Item
                </a>
                <a
                  href="/shopOwner/dashboard/view-items"
                  className="text-sm font-bold text-client-brown nav-link"
                >
                  Inventory
                </a>
                <a
                  href="/shopOwner/discounts"
                  className="text-sm font-bold text-client-brown nav-link"
                >
                  Discounts
                </a>
                <a
                  href="/shopOwner/promotion"
                  className="text-sm font-bold text-client-brown nav-link"
                >
                  Promotion
                </a>
                <a
                  href="/shopOwner/faqs"
                  className="text-sm font-bold text-client-brown nav-link"
                >
                  FAQs
                </a>
                <a
                  href="/shopOwner/dashboard/reviews"
                  className="text-sm font-bold text-client-brown nav-link"
                >
                  Reviews
                </a>
                <a
                  href="/shopOwner/dashboard/report"
                  className="text-sm font-bold text-client-brown nav-link"
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
                  href="/client/dashboard/shops"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Shops
                </a>
                <a
                  href="/client/dashboard/wishlist"
                  className="text-lg font-bold text-client-brown nav-link"
                >
                  Wishlist
                </a>
                <p className="absolute ml-[560px] font-semibold">{user.email}</p>
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
                  href="/client/dashboard/shops"
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
              </>
            )}
          </div>

          {/* search bar and oder button */}
          <div className="flex items-center gap-4">
            <div className="w-36"></div>
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
