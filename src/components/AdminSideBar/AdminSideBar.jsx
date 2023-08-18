import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import { BiMessageDetail } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { AiOutlineDashboard, AiTwotoneCalendar } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { FaUikit, FaProjectDiagram, FaListUl } from "react-icons/fa";
import { SiGotomeeting } from "react-icons/si";
import { BsHeadset, BsBell } from "react-icons/bs";

function AdminSideBar() {
  return (
    <Card className="h-[calc(92vh-2rem)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 font-hubballi border-r-8 rounded-none">
      <List className="mt-32 text-lg border border-blue-gray-200 dark:border-gray-700 p-2 space-y-2">
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <AiOutlineDashboard className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <HiOutlineUsers className="h-5 w-5" />
          </ListItemPrefix>
          Employees
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <FaUikit className="h-5 w-5" />
          </ListItemPrefix>
          Departments
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <SiGotomeeting className="h-5 w-5" />
          </ListItemPrefix>
          Meetings
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <BiMessageDetail className="h-5 w-5" />
          </ListItemPrefix>
          Chat
          <ListItemSuffix>
            <Chip
              value="1"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <AiTwotoneCalendar className="h-5 w-5" />
          </ListItemPrefix>
          Leaves
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <FaProjectDiagram className="h-5 w-5" />
          </ListItemPrefix>
          Live Projects
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <FaListUl className="h-5 w-5" />
          </ListItemPrefix>
          Project Tasks
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <SlCalender className="h-5 w-5" />
          </ListItemPrefix>
          Visitors
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <BsHeadset className="h-5 w-5" />
          </ListItemPrefix>
          Complaints
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <BsBell className="h-5 w-5" />
          </ListItemPrefix>
          Announcements
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default AdminSideBar;
