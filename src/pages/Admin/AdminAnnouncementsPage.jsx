import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminAnnouncements from "../../components/Admin/AdminAnnouncements";
import { Helmet } from 'react-helmet'

function AdminAnnouncementsPage() {
  return (
    <div>
      <Helmet>
        <title>Admin Announcement | Staffsense</title>
      </Helmet>
      <div>
        <AdminNavBar />
      </div>
      <div className="flex col-2">
        <AdminSideBar />
        <AdminAnnouncements />
      </div>
    </div>
  );
}

export default AdminAnnouncementsPage;
