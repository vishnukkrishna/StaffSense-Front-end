import React from 'react'
import { Helmet } from 'react-helmet'
import InNavList from '../../components/NavBar/InNavList'
import EmployeeVisitors from '../../components/Employee/EmployeeVisitors'

function EmployeeVisitorsPage() {
    return (
        <div>
            <Helmet>
                <title>
                    Employee Visitors | Staffsense
                </title>
            </Helmet>
            <div>
                <InNavList />
            </div>
            <div>
                <EmployeeVisitors />
            </div>
        </div>
    )
}

export default EmployeeVisitorsPage