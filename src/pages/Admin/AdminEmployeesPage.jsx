import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminEmployees from "../../components/Admin/AdminEmployees";

function AdminEmployeesPage() {
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminEmployees />
      </div>
    </div>
  );
}

export default AdminEmployeesPage;
