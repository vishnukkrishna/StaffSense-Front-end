import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import profile from "../../images/profile-pic.jpg";
import logo from "../../images/staffsense-transparent.png";
import { Button } from "@material-tailwind/react";
// import { BACKEND_BASE_URL } from "../../api/Api";
// import axios from "axios";


function MenuComponent() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  console.log("user:", user); // Add this line for debugging
  // const [recipientdetails, setRecipientDetails] = useState([])

  // const setUserProfileDetails = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${BACKEND_BASE_URL}/user/userdetails/`
  //     );
  //     setRecipientDetails(response.data)
  //     console.log(response, "llllllllllllllllllllllll");
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  // useEffect(() => {
  //   setUserProfileDetails();
  // }, []);

  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("access_token");
    setUser(null);
    setTimeout(() => {
      navigate("/");
    });
  };

  return (
    <div className="bg-indigo-500 h-28 font-fontHubballi text-xl">
      <div className="flex justify-between">
        <div className="flex justify-end mt-10 ml-16 m-10 w-40 h-30 cursor-pointer">
          <a href="/home">
            <img src={logo} alt="Logo" className="flex items-center transition-transform duration-300 hover:translate-x-4" />
          </a>
        </div>
        <div className="flex">
          {/* <img
            className="w-14 h-14 space-x-4 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mr-5 mt-7"
            // src={BACKEND_BASE_URL + recipientdetails?.profile_pic || '/path/to/default-image.jpg'}
            src={profile}
            alt=""
          /> */}
          <div className="font-semibold text-white cursor-pointer mr-4 mt-9">
            {user ? (
              <>
                <div>{user.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Joined in August 2023
                </div>
              </>
            ) : (
              <div>Loading user data...</div>
            )}
          </div>

          <Button
            className="w-23 text-center h-10 mt-9 mr-7 hover:bg-gray-800"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MenuComponent;
