import React from "react";
import EmployeeComplaint from "../../components/Employee/EmployeeComplaint";
import InNavList from "../../components/NavBar/InNavList";
import { Helmet } from "react-helmet";

function EmployeeComplaintPage() {
    return (
        <div>
            <Helmet>
                <title>
                    Employee Complaints | Staffsense
                </title>
            </Helmet>
            <div>
                <InNavList />
            </div>
            <div>
                <EmployeeComplaint />
            </div>
        </div>
    )
}

export default EmployeeComplaintPage