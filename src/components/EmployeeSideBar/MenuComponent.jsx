import React from "react";
import profile from "../../images/profile-pic.jpg";
import { BiDownArrow } from "react-icons/bi";
import logo from "../../images/staffsense-transparent.png";

function MenuComponent() {
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
        </div>
      </div>
    </div>
  );
}

export default MenuComponent;
