import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/Api";
import AuthContext from "../Contexts/AuthContext";

function EmployeeAppliedLeave() {
    const { user } = useContext(AuthContext);
    const [leave, setLeave] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const leavePerPage = 3;
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (user && user.user_id) {
            fetchUserLeaveRequests(user.user_id);
        }
    }, [user, currentPage]);

    useEffect(() => {
        // Update filtered leave whenever searchQuery changes
        filterLeave();
    }, [searchQuery, leave]);

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

    const filterLeave = () => {
        if (searchQuery.trim() === "") {
            setLeave(leave);
        } else {
            const filtered = leave.filter((request) => {
                return (
                    request.leave_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    request.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    request.start_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    request.end_date.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setLeave(filtered);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="font-fontHubballi px-32 overflow-x-auto w-full h-full">
            <form style={{ maxWidth: "700px", margin: "100px auto" }}>
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-blod text-gray-900 sr-only dark:text-gray-300"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block p-4 pl-10 w-full text-base text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Leave Requests"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-lg text-center">
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Leave Types
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reason for Leave
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Start Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            End Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentLeave.map((request, index) => (
                        <tr
                            key={request.id}
                            className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                            >
                                {index + 1}
                            </th>
                            <td className="px-6 py-4">{request.leave_type}</td>
                            <td className="px-6 py-4">{request.reason}</td>
                            <td className="px-6 py-4">
                                {request.start_date} to {request.end_date}
                            </td>
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
            <div className="flex justify-end items-center mt-2 mr-5">
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
                        {Array.from({
                            length: Math.ceil(leave.length / leavePerPage),
                        }).map((item, index) => (
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
                        ))}
                        <li>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className={`h-10 px-5 text-indigo-500 transition-colors duration-150 bg-white border border-indigo-500 rounded-r-lg focus:shadow-outline hover:bg-indigo-100 ${currentPage === Math.ceil(leave.length / leavePerPage)
                                    ? "cursor-not-allowed"
                                    : ""
                                    }`}
                                disabled={
                                    currentPage === Math.ceil(leave.length / leavePerPage)
                                }
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default EmployeeAppliedLeave;
