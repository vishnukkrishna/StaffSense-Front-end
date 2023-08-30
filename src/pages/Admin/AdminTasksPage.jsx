import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminTasks from "../../components/Admin/AdminTasks";
import { Helmet } from 'react-helmet'

function AdminTasksPage() {
  return (
    <div>
      <Helmet>
        <title>Admin Task | Staffsense</title>
      </Helmet>
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
