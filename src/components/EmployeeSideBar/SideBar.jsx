import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { BiUserCircle, BiMessageDetail } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

function SideBar() {

  const [open, setOpen] = useState(true);
  const mediumBreakpoint = 768;

  const updateOpenState = () => {
    if (window.innerWidth < mediumBreakpoint) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    updateOpenState();
    window.addEventListener("resize", updateOpenState);
    return () => {
      window.removeEventListener("resize", updateOpenState);
    };
  }, []);

  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [isFirstClick, setIsFirstClick] = useState(true);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    if (isFirstClick) {
      setIsFirstClick(false);
      const path = location.pathname;
      setActiveLink(path);
    }
  }, [isFirstClick, location.pathname]);

  const Menus = [
    { title: "Profile", icon: <BiUserCircle />, path: "/profileuser" },
    { title: "Tasks", icon: <BsListCheck />, path: "/usertask" },
    { title: "My Leave", icon: <SlCalender />, path: "/myleave" },
    { title: "Applied Leaves", icon: <AiOutlineClockCircle />, path: "/leaves" },
    { title: "Help Desk", icon: <BiMessageDetail />, path: "/chat" },
  ];

  return (
    <div className="h-screen">

    <Card className={`h-full max-w-[20rem] ${open ? "w-72" : "w-20"} p-5 shadow-xl shadow-blue-gray-900/5 font-hubballi ${open && "border-r-8"} rounded-none h-full`}>
      <AiOutlineMenuFold className={`bg-white text-3xl mt-28 text-dark-purple absolute -right-3 top-9 border-2 border-black cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
      <List className={`mt-52 text-base ${open && "border border-blue-gray-200 dark:border-gray-700 space-y-2 h-full"}`}>
        {Menus.map((menu, index) => (
          <ListItem
            key={index}
            className={`${open ? 'border-b border-blue-gray-300 dark:border-gray-600' : ''} ${activeLink === menu.path && open
              ? 'bg-indigo-500 text-white font-bold rounded-lg shadow-md'
              : ''
              }`}
          >
            <ListItemPrefix className={`${open ? '' : 'my-3'}`}>
              {menu.icon}
            </ListItemPrefix>
            {open && (
              <Link
                to={menu.path}
                onClick={() => handleLinkClick(menu.path)}
                className={`block py-2 px-7 transition-colors duration-300 rounded-lg ${activeLink === menu.path ? 'hover:bg-indigo-500 hover:text-white' : 'hover:bg-cyan-800 hover:text-white'}`}
              >
                {menu.title}
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </Card>
    </div>

  );
}

export default SideBar;
