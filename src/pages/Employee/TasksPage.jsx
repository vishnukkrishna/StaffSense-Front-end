import React from "react";
import MenuComponent from "../../components/EmployeeSideBar/MenuComponent";
import SideBar from "../../components/EmployeeSideBar/SideBar";
import EmployeeTasks from "../../components/Employee/EmployeeTasks";

function TasksPage() {
  return (
    <div>
      <div>
        <MenuComponent />
      </div>
      <div className="flex col-2">
        <SideBar />
        <EmployeeTasks />
      </div>
    </div>
  );
}

export default TasksPage;
