import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BACKEND_BASE_URL } from "../../api/Api";


function AdminComplaints() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        fetchComplaints();
    }, []);

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

    const updateStatus = async (complaintId, newStatus) => {
        try {
            const response = await axios.patch(
                `${BACKEND_BASE_URL}/complaint/complaints/${complaintId}/`,
                {
                    status: newStatus,
                }
            );
            toast.error("Failed to update complaint status");
            fetchComplaints();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update complaint status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-500 text-dark";
            case "In Progress":
                return "bg-blue-500 text-dark";
            case "Resolved":
                return "bg-green-500 text-dark";
            default:
                return "bg-gray-500 text-dark";
        }
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
                        {complaints.map((complaint) => (
                            <tr key={complaint.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-dark"
                                >
                                    {complaint.id}
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
                                            onChange={(event) =>
                                                updateStatus(complaint.id, event.target.value)
                                            }
                                            className={`${getStatusColor(complaint.status)} border cursor-pointer border-black rounded-md `}
                                        >
                                            <option value="Pending" hidden={complaint.status === "In Progress" || complaint.status === "Pending"}>Pending</option>
                                            <option value="In Progress" hidden={complaint.status === "In Progress"}>
                                                In Progress
                                            </option>
                                            <option value="Resolved" hidden={complaint.status === "IN PROGRESS"}>
                                                Resolved
                                            </option>
                                        </select>
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

export default AdminComplaints