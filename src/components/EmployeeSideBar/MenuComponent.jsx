import React from "react";
import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import profile from "../../images/profile-pic.jpg";

function MenuComponent() {
  return (
    <>
      {/* <Menu className="relative inline-block text-left">
        <MenuHandler>
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointer"
            src={profile}
          />
        </MenuHandler>
        <MenuList className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-blue-gray-100">
          <MenuItem className="px-4 py-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <Typography variant="small" className="font-normal">
              My Profile
            </Typography>
          </MenuItem>
          <hr className="my-2 border-blue-gray-50" />
          <MenuItem className="px-4 py-2 flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
              />
            </svg>
            <Typography variant="small" className="font-normal">
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu> */}

      <div className="flex space-x-4">
        <img
          className="w-14 h-14 rounded-full"
          src={profile}
          alt=""
        />
        <div className="font-medium dark:text-white">
          <div>Vishnu Krishnakumar</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Joined in August 2023
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuComponent;
