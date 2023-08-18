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
function SideBar() {
  return (
    // h-[calc(92vh-2rem)] max-w-[20rem]
    <Card className="h-[calc(92vh-2rem)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 font-hubballi border-r-8 rounded-none">
      <List className="mt-32 text-lg border border-blue-gray-200 dark:border-gray-700 p-2 space-y-2">
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <BiUserCircle className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <BsListCheck className="h-5 w-5" />
          </ListItemPrefix>
          Tasks
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <SlCalender className="h-5 w-5" />
          </ListItemPrefix>
          My Leave
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
          <ListItemPrefix>
            <AiOutlineClockCircle className="h-5 w-5" />
          </ListItemPrefix>
          Applied Leaves
        </ListItem>
        <ListItem className="border-b border-blue-gray-300 dark:border-gray-600">
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

export default SideBar;
