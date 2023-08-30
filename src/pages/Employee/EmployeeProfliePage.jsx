import React from "react";
import MenuComponent from "../../components/EmployeeSideBar/MenuComponent";
import SideBar from "../../components/EmployeeSideBar/SideBar";
import EmployeeProflie from "../../components/Employee/EmployeeProflie";
import { Helmet } from 'react-helmet'

function EmployeeProfilePage() {
  return (
    <div>
      <Helmet>
        <title>
          Employee Profile | Staffsense
        </title>
      </Helmet>
      <div className="flex col-2 relative">
        <SideBar />
        <EmployeeProflie />
        <div className="absolute top-0 w-full">
        <MenuComponent />
      </div>
      </div>
    </div>
  );
}

export default EmployeeProfilePage;
