import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_BASE_URL } from "../../api/Api";


function AdminComplaints() {

    const [complaints, setComplaints] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const complaintPerPage = 3;

    useEffect(() => {
        fetchComplaints();
    }, [currentPage]);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/complaint/complaints/`
            );

            setComplaints(response.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch complaints");
        }
    };

    const handleStatusChange = async (event, complaint) => {
        const newStatus = event.target.value;

        try {
            const response = await axios.patch(
                `${BACKEND_BASE_URL}/complaint/complaints/${complaint.id}/`,
                {
                    status: newStatus,
                }
            );
            toast.success("Complaint status updated successfully");
            fetchComplaints();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update complaint status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-500 text-black";
            case "In Progress":
                return "bg-blue-500 text-black";
            case "Resolved":
                return "bg-green-500 text-black";
            default:
                return "bg-gray-500 text-black";
        }
    };

    const indexOfLastComplaint = currentPage * complaintPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - complaintPerPage;
    const currentComplaint = complaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="mt-44 ml-64 overflow-x-auto shadow-md sm:rounded-lg w-3/5 h-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-lg text-center">
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Employee Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentComplaint.map((complaint, index) => (
                            <tr key={complaint.id} className="text-black border-b text-base text-center">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                                >
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4"> {complaint.employee.username}</td>
                                <td className="px-6 py-4"> {complaint.employee.email}</td>
                                <td className="px-6 py-4"> {complaint.description}</td>
                                <td className="px-6 py-4">
                                    {complaint.status === "Resolved" ? (
                                        <div
                                            className={`state-resolved rounded-lg ${getStatusColor(
                                                complaint.status
                                            )}`}
                                        >
                                            RESOLVED
                                        </div>
                                    ) : (
                                        <select
                                            value={complaint.status}
                                            onChange={(event) => handleStatusChange(event, complaint)}
                                            className={`${getStatusColor(complaint.status)} border cursor-pointer border-black rounded-md`}
                                        >
                                            <option value="Pending" hidden={complaint.status === "In Progress" || complaint.status === "Pending"}>Pending</option>
                                            <option value="In Progress" hidden={complaint.status === "In Progress"}>
                                                In Progress
                                            </option>
                                            <option value="Resolved" hidden={complaint.status === "In Progress"}>
                                                Resolved
                                            </option>
                                        </select>
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
                            {Array.from({ length: Math.ceil(complaints.length / complaintPerPage) }).map(
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
                                        Math.ceil(complaints.length / complaintPerPage)
                                        ? "cursor-not-allowed"
                                        : ""
                                        }`}
                                    disabled={
                                        currentPage ===
                                        Math.ceil(complaints.length / complaintPerPage)
                                    }
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default AdminComplaints