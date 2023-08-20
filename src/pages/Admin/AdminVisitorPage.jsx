import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminVisitors from "../../components/Admin/AdminVisitors";

function AdminVisitorPage() {
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminVisitors />
      </div>
    </div>
  );
}

export default AdminVisitorPage;
