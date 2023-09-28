import React, { useEffect, useState } from "react";
import { fetchVisitors } from "../../data/VisitorApi";
import { ToastContainer } from 'react-toastify'
import AddVisitors from '../Modal/EmployeeModal/AddVisitors'

function EmployeeVisitors() {

    const [visitors, setVisitors] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const ComplaintPerPage = 3;


    useEffect(() => {
        fetchVisitorData();
    }, [currentPage]);

    const fetchVisitorData = async () => {
        try {
            const data = await fetchVisitors();
            console.log(data, "visitor data");
            setVisitors(data);
        } catch (error) {
            console.error("Error fetching visitor data:", error.message);
        }
    };

    const indexOfLastComplaint = currentPage * ComplaintPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - ComplaintPerPage;
    const currentVisitor = visitors.slice(indexOfFirstComplaint, indexOfLastComplaint);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <ToastContainer />
            <div>
                <div className="mt-10 pl-20">
                    <AddVisitors Action={fetchVisitorData} />
                </div>
                <div className="flex relative font-fontHubballi mt-40 ml-64 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="text-lg">
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Visitor Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Reason
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Start_time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    End_time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVisitor.map((visitor, index) => (
                                <tr key={visitor.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{visitor.name}</td>
                                    <td className="px-6 py-4">{visitor.reason}</td>
                                    <td className="px-6 py-4">{visitor.email}</td>
                                    <td className="px-6 py-4">{visitor.date}</td>
                                    <td className="px-6 py-4">{visitor.start_time}</td>
                                    <td className="px-6 py-4">{visitor.end_time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                        {Array.from({ length: Math.ceil(visitors.length / ComplaintPerPage) }).map(
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
                                    Math.ceil(visitors.length / ComplaintPerPage)
                                    ? "cursor-not-allowed"
                                    : ""
                                    }`}
                                disabled={
                                    currentPage ===
                                    Math.ceil(visitors.length / ComplaintPerPage)
                                }
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default EmployeeVisitors