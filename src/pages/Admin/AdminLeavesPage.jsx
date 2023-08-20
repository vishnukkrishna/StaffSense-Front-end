import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminLeaves from "../../components/Admin/AdminLeaves";

function AdminLeavesPage() {
  return (
    <div>
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
