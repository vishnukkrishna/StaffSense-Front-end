import React from "react";
import MenuComponent from "../../components/EmployeeSideBar/MenuComponent";
import SideBar from "../../components/EmployeeSideBar/SideBar";
import EmployeeProflie from "../../components/Employee/EmployeeProflie";

function EmployeeProfilePage() {
  return (
    <div>
      <div>
        <MenuComponent />
      </div>
      <div className="flex col-2">
        <SideBar />
        <EmployeeProflie />
      </div>
    </div>
  );
}

export default EmployeeProfilePage;
