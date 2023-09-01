import React from "react";
import MenuComponent from "../../components/EmployeeSideBar/MenuComponent";
import SideBar from "../../components/EmployeeSideBar/SideBar";
import EmployeeTasks from "../../components/Employee/EmployeeTasks";
import { Helmet } from 'react-helmet'

function EmployeeTasksPage() {
  return (
    // <div className="bg-red-500 h-screen">
    <div className="h-screen">
      <Helmet>
        <title>
          Employee Task | Staffsense
        </title>
      </Helmet>
      <div className="w-full">
          <MenuComponent />
      </div>
      <div className="flex min-h-screen">
        <SideBar />
        <EmployeeTasks />
        
      </div>
    </div>

    // </div>
  );
}

export default EmployeeTasksPage;
