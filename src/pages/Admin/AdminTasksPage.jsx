import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminTasks from "../../components/Admin/AdminTasks";

function AdminTasksPage() {
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminTasks />
      </div>
    </div>
  );
}

export default AdminTasksPage;
