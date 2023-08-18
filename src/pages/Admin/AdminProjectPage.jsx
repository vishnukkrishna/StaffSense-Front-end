import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminProject from "../../components/Admin/AdminProjects";

function AdminProjectPage() {
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminProject/>
      </div>
    </div>
  );
}

export default AdminProjectPage;
