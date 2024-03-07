import React, { useContext, useEffect, useState } from "react";
import img from "../../images/profile-pic.jpg";
import "./Navbar.css";
import { Button } from "@material-tailwind/react";
import logo from "../../images/Logo.png";
import { BACKEND_BASE_URL } from "../../api/Api";
import AuthContext from "../Contexts/AuthContext";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

function InNavList() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setTimeout(() => {
      navigate("/");
    });
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
        <div className="container mx-auto text-sm flex items-center justify-between h-full max-w-6xl px-8 sm:px-6 lg:px-8 xl:px-0">
          <a
            href="/home"
            className="relative flex items-center h-full font-black transition-transform duration-300 hover:translate-x-2"
          >
            <img className="h-7 sm:h-7 md:h-7 lg:h-8" src={logo} alt="" />
            <span className="ml-3 text-xl text-gray-800 sm:text-lg md:text-xl lg:text-2xl"></span>
          </a>

          <nav
            id=""
            className={`${
              isMobileMenuOpen ? "flex animate-waveMotion" : "hidden"
            } absolute top-0 left-0 flex flex-col items-center justify-between w-full h-64 pt-5 mt-24 text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative transition-all duration-300`}
          >
            <NavLink
              to="/home"
              activeclassname="active-link"
              className="group relative text-base sm:text-base md:text-base lg:text-xl ml-0 mr-0 font-bold md:ml-2 md:mr-2 lg:mr-4 sm:mr-4 transition-color hover:text-customColor transition-transform duration-300 hover:translate-x-1"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-customColor transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </NavLink>
            <NavLink
              to="/addmeeting"
              activeclassname="active-link"
              className="group relative text-base sm:text-base md:text-base lg:text-xl ml-0 mr-0 font-bold md:ml-2 md:mr-2 lg:mr-4 sm:mr-4 transition-color hover:text-customColor transition-transform duration-300 hover:translate-x-1"
            >
              Hall Booking
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-customColor transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </NavLink>
            <NavLink
              to="/visitorpage"
              className="group relative text-base sm:text-base md:text-base lg:text-xl ml-0 mr-0 font-bold md:ml-2 md:mr-2 lg:mr-4 sm:mr-4 transition-color hover:text-customColor transition-transform duration-300 hover:translate-x-1"
            >
              Visitor Registration
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-customColor transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </NavLink>
            <NavLink
              to="/usercomplaints"
              className="group relative text-base sm:text-base md:text-base lg:text-xl ml-0 mr-0 font-bold md:ml-2 md:mr-2 lg:mr-4 sm:mr-4 transition-color hover:text-customColor transition-transform duration-300 hover:translate-x-1"
            >
              Requests & Complaints
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-customColor transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </NavLink>
            <div className="flex flex-col w-full font-medium border-t border-gray-200 md:hidden">
              <Link
                onClick={handleLogout}
                className="w-full py-2 font-extrabold text-2xl text-center text-customColor"
              >
                Logout
              </Link>
            </div>
          </nav>
          <div className="absolute gap-3 left-0 mt-0 flex-col items-center justify-center hidden w-full pb-8 border-b border-gray-100 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">
            <Link
              to="/profileuser"
              className="w-10 h-10 rounded-full bg-customColor flex items-center justify-center"
            >
              <div className="transition-transform duration-300 hover:scale-110">
                <img className="rounded-full w-20 h-15" src={img} alt="" />
              </div>
            </Link>
            <Button
              size="sm"
              className="lg:inline-block rounded-full w-32 text-sm bg-customColor h-10 drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
              onClick={handleLogout}
            >
              <span>Logout</span>
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

export default InNavList;
