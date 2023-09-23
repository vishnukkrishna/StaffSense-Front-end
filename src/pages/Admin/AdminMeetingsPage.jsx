import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminMeetings from "../../components/Admin/AdminMeetings";
import { Helmet } from "react-helmet";

function AdminMeetingsPage() {
  return (
    <div>
      <Helmet>
        <title>Admin Meeting | Staffsense</title>
      </Helmet>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminMeetings />
      </div>
    </div>
  );
}

export default AdminMeetingsPage;
