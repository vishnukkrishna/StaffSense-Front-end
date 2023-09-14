import React from 'react'
import { Helmet } from 'react-helmet'
import MenuComponent from '../../components/EmployeeSideBar/MenuComponent'
import SideBar from '../../components/EmployeeSideBar/SideBar'
import EmployeeAppliedLeave from '../../components/Employee/EmployeeAppliedLeave'

function EmployeeAppliedLeavePage() {
    return (
        <div className="h-screen">
            <Helmet>
                <title>
                    Employee Applied Leave | Staffsense
                </title>
            </Helmet>
            <div className="w-full">
                <MenuComponent />
            </div>
            <div className="flex min-h-screen">
                <SideBar />
                <EmployeeAppliedLeave />
            </div>
        </div>
    )
}

export default EmployeeAppliedLeavePage