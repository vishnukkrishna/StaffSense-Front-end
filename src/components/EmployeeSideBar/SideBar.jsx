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
import { BiUserCircle, BiMessageDetail } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";

import logo from "../../images/Logo.png";
function SideBar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 font-hubballi">
      <div className="mb-2 p-4 items-center">
        <div className="mt-6 m-10 w-40 h-30">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <List className="mt-32 text-lg">
        <ListItem>
          <ListItemPrefix>
            <BiUserCircle className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BsListCheck className="h-5 w-5" />
          </ListItemPrefix>
          Tasks
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <SlCalender className="h-5 w-5" />
          </ListItemPrefix>
          My Leave
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <AiOutlineClockCircle className="h-5 w-5" />
          </ListItemPrefix>
          Applied Leaves
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BiMessageDetail className="h-5 w-5" />
          </ListItemPrefix>
          Help Desk
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
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default SideBar;
