import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminDashboard from "../../components/Admin/AdminDashboard";


function AdminDashBoardPage() {
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminDashboard/>
      </div>
    </div>
  );
}

export default AdminDashBoardPage;
