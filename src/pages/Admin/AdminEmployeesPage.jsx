import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminEmployees from "../../components/Admin/AdminEmployees";
import { Helmet } from 'react-helmet'

function AdminEmployeesPage() {
  return (
    <div>
      <Helmet>
        <title>Employee List | Staffsense</title>
      </Helmet>
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
