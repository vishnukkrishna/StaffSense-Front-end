import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminDepartments from "../../components/Admin/AdminDepartments";

function AdminDepartmentPage() {
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminDepartments />
      </div>
    </div>
  );
}

export default AdminDepartmentPage;
