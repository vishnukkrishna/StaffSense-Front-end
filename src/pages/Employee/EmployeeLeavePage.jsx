import React from 'react'
import LeaveCalender from '../../components/Calender/LeaveCalender'
import { Helmet } from 'react-helmet'
import MenuComponent from '../../components/EmployeeSideBar/MenuComponent'
import SideBar from '../../components/EmployeeSideBar/SideBar'

function EmployeeLeavePage() {
    return (
        <div className="h-screen">
            <Helmet>
                <title>
                    Employee Leave | Staffsense
                </title>
            </Helmet>
            <div className="w-full">
                <MenuComponent />
            </div>
            <div className="flex min-h-screen">
                <SideBar />
                <LeaveCalender />
            </div>
        </div>
    )
}

export default EmployeeLeavePage