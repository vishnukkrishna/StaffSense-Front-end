import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import img from '../../images/profile-pic.jpg'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import logo from "../../images/Logo.png";
import { BACKEND_BASE_URL } from "../../api/Api";
import AuthContext from "../Contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { BsBell } from 'react-icons/bs'
import { Badge } from "@material-tailwind/react";

function InNavList() {
  // let { userProfile } = useContext(AuthContext)
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);
  // const user_id = user && user.user_id;


  const [userData, setUserData] = useState(null);
  // useEffect(() => {
  //   fetchUserData();
  // }, []);


  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BACKEND_BASE_URL}/user/userdetails/`
  //     );

  //     setUserData(response.data);
  //     console.log(response.data, "llllllllllllllllllllllll");
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  const location = useLocation();

  const isRouteActive = (route) => {
    return location.pathname === route;
  };


  console.log(user, "data");
  const handleLogout = () => {
    console.log("Logout button clicked");
    localStorage.removeItem("access_token");
    setUser(null);
    setTimeout(() => {
      navigate("/");
    })
  };
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 drop-shadow-2xl">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-semibold text-2xl font-fontHubballi ${isRouteActive("/home") ? "text-red-800" : ""
          }`}
      >
        <Link
          to="/home"
          className="flex items-center transition-transform duration-300 hover:translate-x-2"
        >
          Home
        </Link>

      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-semibold text-2xl font-fontHubballi ${isRouteActive("/addmeeting") ? "text-red-800" : ""
          }`}
      >
        <Link
          to="/addmeeting"
          className="flex items-center transition-transform duration-300 hover:translate-x-2"
        >
          Hall Booking
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-semibold text-2xl font-fontHubballi ${isRouteActive("/visitorpage") ? "text-red-800" : ""
          }`}
      >
        <Link
          to="/visitorpage"
          className="flex items-center transition-transform duration-300 hover:translate-x-2"
        >
          Visitor Registration
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={`p-1 font-semibold text-2xl font-fontHubballi ${isRouteActive("/usercomplaints") ? "text-red-800" : ""
          }`}
      >
        <Link
          to="/usercomplaints"
          className="flex items-center transition-transform duration-300 hover:translate-x-2"
        >
          Requests & Complaints
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div>
      <div className="pt-24">
        <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <div className="cursor-pointer smooth-scroll">
              <a href="/home" className="">
                <img src={logo} alt="Logo" className="w-60 h-15 flex items-center transition-transform duration-300 hover:translate-x-4" />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
              <div className="mr-3 cursor-pointer">
                <Menu
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                >
                  <MenuHandler>
                    <div>

                      <Badge content={0} className="" max={999} color="red">
                        <BsBell className="w-7 h-7 text-customColor" />
                      </Badge>
                    </div>
                  </MenuHandler>
                  <MenuList className="mt-5">
                    <MenuItem>Menu Item 1</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                  </MenuList>
                </Menu>
              </div>
              <Link
                to="/profileuser"
                className="w-10 h-10 rounded-full bg-customColor flex items-center justify-center"
              >
                {/* <FaUserCircle className="text-white text-3xl md:text-4xl" /> */}
                <img className="rounded-full w-20 h-15" src={img} alt="" />
                {/* <Avatar
                  size="md"
                  variant="circular"
                  alt="avatar"
                  src={BACKEND_BASE_URL + userData.profile_pic}
                  className="border border-e-light-green-100 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
                /> */}
              </Link>
              <Button
                size="sm"
                className="hidden lg:inline-block rounded-full w-36 bg-customColor h-12 text-lg drop-shadow-md"
                onClick={handleLogout}
              >
                <span>LOGOUT</span>
              </Button>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <MobileNav open={openNav}>
            {navList}
            <Button
              size="sm"
              fullWidth
              className="mb-2 bg-customColor drop-shadow-md"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </Button>
          </MobileNav>
        </Navbar>
      </div>
    </div>
  );
}

export default InNavList;
