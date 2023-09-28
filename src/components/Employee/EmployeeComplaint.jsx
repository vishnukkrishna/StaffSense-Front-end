import React, { useEffect, useState, useContext } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import axios from "axios";
import AuthContext from "../../components/Contexts/AuthContext";
import AddComplaint from '../../components/Modal/EmployeeModal/AddComplaint'

function EmployeeComplaint() {

    const [complaints, setComplaints] = useState([]);
    const { user } = useContext(AuthContext);

    const [currentPage, setCurrentPage] = useState(1);
    const ComplaintPerPage = 3;

    useEffect(() => {
        if (user && user.user_id) {
            fetchComplaints();
        }
    }, [user, currentPage]);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URL}/complaint/complaintuser/${user.user_id}/`
            );
            setComplaints(response.data);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };

    const indexOfLastComplaint = currentPage * ComplaintPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - ComplaintPerPage;
    const currentComplaint = complaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!user || !user.user_id) {
        return <div>Loading employee information...</div>;
    }

    return (
        <div>
            <div className="mt-10 pl-20">
                <AddComplaint Action={fetchComplaints} />
            </div>
            <div className="flex relative font-fontHubballi mt-40 ml-64 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-lg">
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Employee Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
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
                            <tr key={complaint.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                                >
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">{user.username}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{complaint.description}</td>
                                <td className="px-6 py-4">{complaint.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end items-center mt-4 mr-64">
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
                        {Array.from({ length: Math.ceil(complaints.length / ComplaintPerPage) }).map(
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
                                    Math.ceil(complaints.length / ComplaintPerPage)
                                    ? "cursor-not-allowed"
                                    : ""
                                    }`}
                                disabled={
                                    currentPage ===
                                    Math.ceil(complaints.length / ComplaintPerPage)
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

export default EmployeeComplaint