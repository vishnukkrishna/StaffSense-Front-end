import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminDashboard from "../../components/Admin/AdminDashboard";
import { Helmet } from 'react-helmet'

function AdminDashBoardPage() {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Staffsense</title>
      </Helmet>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminDashboard />
      </div>
    </div>
  );
}

export default AdminDashBoardPage;
