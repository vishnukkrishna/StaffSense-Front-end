import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminProject from "../../components/Admin/AdminProjects";
import { Helmet } from 'react-helmet'

function AdminProjectPage() {
  return (
    <div>
      <Helmet>
        <title>Admin Projects | Staffsense</title>
      </Helmet>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminProject />
      </div>
    </div>
  );
}

export default AdminProjectPage;
