import React from 'react'
import { Helmet } from 'react-helmet'
import InNavList from '../../components/NavBar/InNavList'
import EmployeeMeetings from '../../components/Employee/EmployeeMeetings'

function EmployeeMeetingPage() {
    return (
        <div>
            <Helmet>
                <title>
                    Employee Meetings | Staffsense
                </title>
            </Helmet>
            <div>
                <InNavList />
            </div>
            <div>
                <EmployeeMeetings />
            </div>
        </div>
    )
}

export default EmployeeMeetingPage