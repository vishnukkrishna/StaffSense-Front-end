import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/Api";
import AuthContext from "../Contexts/AuthContext";

function EmployeeAppliedLeave() {
    const { user } = useContext(AuthContext);
    const [leave, setLeave] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const leavePerPage = 2;

    useEffect(() => {
        if (user && user.user_id) {
            fetchUserLeaveRequests(user.user_id);
        }
    }, [user, currentPage]);

    const fetchUserLeaveRequests = async (userId) => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/leave/employee_leave_requests/${userId}/`
            );
            const data = response.data;
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

    const indexOfLastLeave = currentPage * leavePerPage;
    const indexOfFirstLeave = indexOfLastLeave - leavePerPage;
    const currentLeave = leave.slice(indexOfFirstLeave, indexOfLastLeave);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Guard against accessing user properties when user is null
    if (!user) {
        return <div>Loading...</div>; // You can return a loading indicator or handle this case differently.
    }

    return (
        <div className="font-fontHubballi mt-52 px-32 overflow-x-auto w-full h-full">
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
                    {currentLeave.map((request, index) => (
                        <tr key={request.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                            >
                                {index + 1}
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
            <div className="flex justify-end items-center mt-4 mr-10">
                <nav aria-label="Page navigation">
                    <ul className="inline-flex">
                        <li>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-r-0 border-indigo-500 rounded-l-lg focus:shadow-outline hover:bg-indigo-100 ${currentPage === 1 ? "cursor-not-allowed" : ""
                                    }`}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                        </li>
                        {Array.from({ length: Math.ceil(leave.length / leavePerPage) }).map(
                            (item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => paginate(index + 1)}
                                        className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-r-0 border-indigo-500 focus:shadow-outline ${currentPage === index + 1
                                            ? "bg-indigo-500 text-red-800 text-2xl font-extrabold"
                                            : "hover:bg-red-200 hover:text-red-500"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            )
                        )}
                        <li>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-indigo-500 rounded-r-lg focus:shadow-outline hover:bg-indigo-100 ${currentPage ===
                                    Math.ceil(leave.length / leavePerPage)
                                    ? "cursor-not-allowed"
                                    : ""
                                    }`}
                                disabled={
                                    currentPage ===
                                    Math.ceil(leave.length / leavePerPage)
                                }
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default EmployeeAppliedLeave