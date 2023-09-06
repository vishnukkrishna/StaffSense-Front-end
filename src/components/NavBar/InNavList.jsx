import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img from '../../images/profile-pic.jpg'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import logo from "../../images/Logo.png";
import { BACKEND_BASE_URL } from "../../api/Api";
import AuthContext from "../Contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";

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


  console.log(user, "data");
  const handleLogout = () => {
    console.log("Logout button clicked");
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/");
  };
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 drop-shadow-2xl ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-2xl font-fontHubballi"
      >
        <a href="#" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-2xl font-fontHubballi"
      >
        <a href="#" className="flex items-center">
          Hall Booking
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-2xl font-fontHubballi"
      >
        <a href="#" className="flex items-center">
          Visitor Registration
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-2xl font-fontHubballi"
      >
        <a href="/usercomplaints" className="flex items-center">
          Requests & Complaints
        </a>
      </Typography>
    </ul>
  );
  if(userData){
}
  return (
    <div>
      <div className="pt-24">
        <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <div className="w-40 h-30">
              <img src={logo} alt="Logo" />
            </div>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
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
