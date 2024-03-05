import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import logo from "../../images/Logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function OutNavBar() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  const handleClick = () => {
    navigate("/user");
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isIconClicked, setIconClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleIconClick = () => {
    setIconClicked(!isIconClicked);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <header className="relative w-full h-20 border-b-2 z-[999]">
        <div className="container mx-auto flex items-center justify-between h-full max-w-6xl px-8 sm:px-6 lg:px-8 xl:px-0">
          <a
            href="/"
            className="relative flex items-center h-full font-black transition-transform duration-300 hover:translate-x-2"
          >
            <img className="w-36 h-7 sm:h-7 md:h-7 lg:h-7" src={logo} alt="" />
            <span className="ml-3 text-xl text-gray-800 sm:text-lg md:text-xl lg:text-2xl"></span>
          </a>

          <nav
            id=""
            className={`${
              isMobileMenuOpen ? "flex animate-waveMotion" : "hidden"
            } absolute top-0 left-0 flex flex-col items-center justify-between w-full h-64 pt-5 mt-24 text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative transition-all duration-300`}
          >
            <NavLink
              to="/"
              activeclassname="active-link"
              className="group relative text-xl ml-0 mr-0 font-bold md:ml-2 md:mr-2 lg:mr-4 sm:mr-4 transition-color hover:text-red-600 transition-transform duration-300 hover:translate-x-1"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </NavLink>
            <NavLink
              to="#"
              activeclassname="active-link"
              className="group relative text-xl ml-0 mr-0 font-bold md:ml-2 md:mr-2 lg:mr-4 sm:mr-4 transition-color hover:text-red-600 transition-transform duration-300 hover:translate-x-1"
            >
              Company
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </NavLink>
            <a
              href="#feature"
              className="group relative text-xl ml-0 mr-0 font-bold md:ml-2 md:mr-2 lg:mr-4 sm:mr-4 transition-color hover:text-red-600 transition-transform duration-300 hover:translate-x-1"
            >
              Our Features
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <Link
              href="#"
              className="group relative text-xl ml-0 mr-0 font-bold md:ml-2 md:mr-2 lg:mr-4 sm:mr-4 transition-color hover:text-red-600 transition-transform duration-300 hover:translate-x-1"
            >
              About us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <div className="flex flex-col w-full font-medium border-t border-gray-200 md:hidden">
              <Link
                to="/user"
                className="w-full py-2 font-extrabold text-2xl outline-4 text-center text-customColor"
              >
                Login
              </Link>
            </div>
          </nav>
          <div className="absolute left-0 mt-0 flex-col items-center justify-center hidden w-full pb-8 border-b border-gray-100 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">
            <Button
              size="sm"
              className="hidden lg:inline-block rounded-full w-32 text-sm bg-customColor h-10 drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
              onClick={handleClick}
            >
              <span>Login Now</span>
            </Button>
            <div
              className="mr-2"
              style={{
                transform: "rotate(90deg) scaleX(0.5)",
                color: "grey",
                fontSize: "45px",
              }}
            ></div>
          </div>
          <div
            id="nav-mobile-btn"
            className="absolute top-0 right-0  block w-8 md:w-10 mt-7 mr-6 md:mr-10 cursor-pointer select-none md:hidden sm:mt-7 transition-transform duration-300 ease-in-out"
            onClick={toggleMobileMenu}
          >
            <span
              className={`block w-full h-1 transform bg-customColor rounded-full ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-full h-1 mt-1 transform bg-customColor rounded-full ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-full h-1 mt-1 transform bg-customColor rounded-full ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default OutNavBar;
