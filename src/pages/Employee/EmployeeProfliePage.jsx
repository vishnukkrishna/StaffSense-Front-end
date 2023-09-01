import React from "react";
import MenuComponent from "../../components/EmployeeSideBar/MenuComponent";
import SideBar from "../../components/EmployeeSideBar/SideBar";
import EmployeeProflie from "../../components/Employee/EmployeeProflie";
import { Helmet } from 'react-helmet'

function EmployeeProfilePage() {
  return (
    <div className="h-screen">
      <Helmet>
        <title>
          Employee Profile | Staffsense
        </title>
      </Helmet>
      <div className="w-full">
        <MenuComponent />
      </div>
      <div className="flex min-h-screen">
        <SideBar />
        <EmployeeProflie />
      </div>
    </div>
  );
}

export default EmployeeProfilePage;
