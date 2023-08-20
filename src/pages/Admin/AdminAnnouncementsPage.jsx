import React from "react";
import AdminNavBar from "../../components/AdminSideBar/AdminNavBar";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import AdminAnnouncements from "../../components/Admin/AdminAnnouncements";

function AdminAnnouncementsPage() {
  return (
    <div>
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
