import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/Api";
import AuthContext from "../Contexts/AuthContext";

function EmployeeAppliedLeave() {
    const { user } = useContext(AuthContext);
    const [leave, setLeave] = useState([]);

    useEffect(() => {
        const fetchUserLeaveRequests = async () => {
            try {
                const userId = user.user_id;

                const response = await axios.get(
                    `${BACKEND_BASE_URL}/leave/employee_leave_requests/${userId}/`
                );
                const data = response.data;
                console.log(data, "reachedd");
                if (data.length > 0) {
                    data.sort((a, b) => a.id - b.id);
                    setLeave(data);
                } else {
                    console.log("No data found");
                }
            } catch (error) {
                console.error("Error fetching user leave requests:", error);
            }
        };

        fetchUserLeaveRequests();
    }, [user]);
    return (
        <>
            <div className="mt-44 ml-60 overflow-x-auto shadow-md sm:rounded-lg w-3/5 h-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-lg text-center">
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                leave types
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reason for leave
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Start_date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                End_date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leave.map((request) => (
                            <tr key={request.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                                >
                                    {request.id}
                                </th>
                                <td className="px-6 py-4">{request.leave_type}</td>
                                <td className="px-6 py-4">{request.reason}</td>
                                <td className="px-6 py-4">{request.start_date} to {request.end_date}</td>
                                <td className="px-6 py-4">{request.start_date}</td>
                                <td className="px-6 py-4">{request.end_date}</td>
                                <td className="px-6 py-4">
                                    {request.is_approved === true && (
                                        <span style={{ color: "green", fontWeight: "bold" }}>
                                            Approved
                                        </span>
                                    )}
                                    {request.is_approved === false && (
                                        <span style={{ color: "red", fontWeight: "bold" }}>
                                            Rejected
                                        </span>
                                    )}
                                    {request.is_approved === null && (
                                        <span style={{ color: "orange", fontWeight: "bold" }}>
                                            Pending
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EmployeeAppliedLeave