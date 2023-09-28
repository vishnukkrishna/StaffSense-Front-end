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

    // Add state variables for search
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredComplaints, setFilteredComplaints] = useState([]);

    useEffect(() => {
        if (user && user.user_id) {
            fetchComplaints();
        }
    }, [user, currentPage]);

    useEffect(() => {
        // Update filtered complaints whenever searchQuery changes
        filterComplaints();
    }, [searchQuery, complaints]);

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
    const currentComplaint = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Function to filter complaints based on searchQuery
    const filterComplaints = () => {
        if (searchQuery.trim() === "") {
            setFilteredComplaints(complaints);
        } else {
            const filtered = complaints.filter((complaint) => {
                return (
                    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    complaint.status.toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
            setFilteredComplaints(filtered);
        }
    };

    // Function to handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-400 text-dark";
            case "In Progress":
                return "bg-blue-500 text-dark";
            case "Resolved":
                return "bg-green-500 text-dark";
            default:
                return "bg-gray-500 text-dark";
        }
    };

    if (!user || !user.user_id) {
        return <div>Loading employee information...</div>;
    }

    return (
        <div>
            <div className="mt-10 pl-20">
                <AddComplaint Action={fetchComplaints} />
                <form style={{ maxWidth: "600px", margin: "100px auto" }}>
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
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
                            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Complaints"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex relative font-fontHubballi mt-14 ml-64 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
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
                                <td className="px-6 py-4">
                                    <span className={`p-2 rounded ${getStatusColor(complaint.status)}`} >
                                        {complaint.status}
                                    </span>
                                </td>
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
                        {Array.from({ length: Math.ceil(filteredComplaints.length / ComplaintPerPage) }).map(
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
                                    Math.ceil(filteredComplaints.length / ComplaintPerPage)
                                    ? "cursor-not-allowed"
                                    : ""
                                    }`}
                                disabled={
                                    currentPage ===
                                    Math.ceil(filteredComplaints.length / ComplaintPerPage)
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

export default EmployeeComplaint;
