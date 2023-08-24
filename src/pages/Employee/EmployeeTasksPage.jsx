import React from "react";
import MenuComponent from "../../components/EmployeeSideBar/MenuComponent";
import SideBar from "../../components/EmployeeSideBar/SideBar";
import EmployeeTasks from "../../components/Employee/EmployeeTasks";

function EmployeeTasksPage() {
  return (
    <div>
      <div className="flex col-2 relative">
        <SideBar />
        <EmployeeTasks />
        <div className="absolute top-0 w-full">
          <MenuComponent />
        </div>
      </div>
    </div>
  );
}

export default EmployeeTasksPage;
