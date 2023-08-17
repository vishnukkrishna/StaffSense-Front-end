import React from "react";
import MenuComponent from "./MenuComponent";
import SideBar from "./SideBar";

import { Typography } from "@material-tailwind/react";

function TotalSideBar() {
  return (
    <div className="flex flex-col lg:flex-row font-hubballi">
      <SideBar />

      <div className="lg:w-5/6 lg:flex justify-end p-4">
        <MenuComponent />
        {/* <Typography
          variant="h6"
          className="font-normal text-center lg:text-right mt-3 lg:pl-1"
        >
          Vishnu Krishnakumar
        </Typography> */}
      </div>
    </div>
  );
}

export default TotalSideBar;
