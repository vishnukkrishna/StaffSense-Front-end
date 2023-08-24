import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { BiMessageDetail } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { AiOutlineDashboard, AiTwotoneCalendar } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { FaUikit, FaProjectDiagram, FaListUl } from "react-icons/fa";
import { SiGotomeeting } from "react-icons/si";
import { BsHeadset, BsBell } from "react-icons/bs";
import { AiOutlineMenuFold } from "react-icons/ai";


function AdminSidebar() {

  const [open, setOpen] = useState(true)
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
    { title: "Dashboard", icon: <AiOutlineDashboard />, path: "/dashboard" },
    { title: "Employees", icon: <HiOutlineUsers />, path: "/userlist" },
    { title: "Departments", icon: <FaUikit />, path: "/department" },
    { title: "Meetings", icon: <SiGotomeeting />, path: "/meeting" },
    { title: "Chat", icon: <BiMessageDetail />, path: "/chat" },
    { title: "Leaves", icon: <AiTwotoneCalendar />, path: "/leave" },
    { title: "Live Projects", icon: <FaProjectDiagram />, path: "/projectlist" },
    { title: "Tasks", icon: <FaListUl />, path: "/tasklist" },
    { title: "Visitors", icon: <SlCalender />, path: "/visitor" },
    { title: "Complaints", icon: <BsHeadset />, path: "/complaint" },
    { title: "Announcements", icon: <BsBell />, path: "/announcement" },
  ];

  return (
    <Card className={`h-full max-w-[20rem] ${open ? "w-72" : "w-20"} p-5 shadow-xl shadow-blue-gray-900/5 font-hubballi ${open && "border-r-8"} rounded-none`}>
      <AiOutlineMenuFold className={`bg-white text-3xl text-dark-purple absolute -right-3 top-9 border-2 border-black cursor-pointer ${!open && "rotate-180"} `} onClick={() => setOpen(!open)} />
      <List className={`mt-1 text-base ${open && "border border-blue-gray-200 dark:border-gray-700 space-y-2"}`}>
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
                className={`block py-2 px-7 transition-colors duration-300 rounded-lg ${activeLink === menu.path ? 'hover:bg-indigo-500 hover:text-white' : 'hover:bg-cyan-800 hover:text-white'
                  }`}
              >
                {menu.title}
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export default AdminSidebar;