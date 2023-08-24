import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import profile from "../../images/profile-pic.jpg";
import logo from "../../images/staffsense-transparent.png";
import { Button } from "@material-tailwind/react";

function MenuComponent() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("access_token");
    setUser(null);

    navigate("/");
  };
  return (
    <div className="bg-indigo-500 h-28">
      <div className="flex justify-between">
        <div className="flex justify-end mt-10 ml-16 m-10 w-40 h-30 cursor-pointer">
          <img src={logo} alt="Logo" />
        </div>
        <div className="flex">
          <img
            className="w-14 h-14 space-x-4 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mr-5 mt-7"
            src={profile}
            alt=""
          />
          <div className="font-semibold text-white  cursor-pointer mr-4 mt-9">
            <div>Vishnu Krishnakumar</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2023
            </div>
          </div>
          <Button className="w-23 text-center h-10 mt-9 mr-7" onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default MenuComponent;
