import React from 'react'
import { Helmet } from 'react-helmet'
import AdminNavBar from '../../components/AdminSideBar/AdminNavBar'
import AdminSidebar from '../../components/AdminSideBar/AdminSideBar'
import AdminChat from '../../components/Chat/AdminChat'

function AdminChatsPage() {
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
                <AdminChat />
            </div>
        </div>
    )
}

export default AdminChatsPage