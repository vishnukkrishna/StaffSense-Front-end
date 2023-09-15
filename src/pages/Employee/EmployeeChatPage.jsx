import React from 'react'
import { Helmet } from 'react-helmet'
import MenuComponent from '../../components/EmployeeSideBar/MenuComponent'
import SideBar from '../../components/EmployeeSideBar/SideBar'
import EmployeeChat from '../../components/Chat/EmployeeChat'

function EmployeeChatPage() {
    return (
        <div className="h-screen">
            <Helmet>
                <title>
                    Employee Chat | Staffsense
                </title>
            </Helmet>
            <div className="w-full">
                <MenuComponent />
            </div>
            <div className="flex min-h-screen">
                <SideBar />
                <EmployeeChat />
            </div>
        </div>
    )
}

export default EmployeeChatPage