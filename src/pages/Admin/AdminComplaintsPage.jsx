import React from 'react'
import { Helmet } from 'react-helmet'
import AdminNavBar from '../../components/AdminSideBar/AdminNavBar'
import AdminSidebar from '../../components/AdminSideBar/AdminSideBar'
import AdminComplaints from '../../components/Admin/AdminComplaints'

function AdminComplaintsPage() {
    return (
        <div>
            <Helmet>
                <title>Admin Complaints | Staffsense</title>
            </Helmet>
            <div>
                <AdminNavBar />
            </div>
            <div className="flex col-2">
                <AdminSidebar />
                <AdminComplaints />
            </div>
        </div>
    )
}

export default AdminComplaintsPage