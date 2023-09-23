import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminLeaves from "../../components/Admin/AdminLeaves";
import { Helmet } from "react-helmet";

function AdminLeavesPage() {
  return (
    <div>
      <Helmet>
        <title>Admin Leave | Staffsense</title>
      </Helmet>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminLeaves />
      </div>
    </div>
  );
}

export default AdminLeavesPage;
