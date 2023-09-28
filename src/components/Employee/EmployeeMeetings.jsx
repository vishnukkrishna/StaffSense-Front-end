import React, { useEffect, useState } from "react";
import AddMeeting from '../Modal/EmployeeModal/AddMeeting';
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/Api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployeeMeetings() {

    const [meeting, setMeeting] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const ComplaintPerPage = 3;

    useEffect(() => {
        fetchMeetingData();
    }, [currentPage]);

    const fetchMeetingData = async () => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}/meeting/meetings/`);
            setMeeting(response.data);
        } catch (error) {
            console.error("Error fetching meeting data:", error);
        }
    };

    const indexOfLastComplaint = currentPage * ComplaintPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - ComplaintPerPage;
    const currentMeeting = meeting.slice(indexOfFirstComplaint, indexOfLastComplaint);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <ToastContainer />
            <div>
                <div className="mt-10 pl-20">
                    <AddMeeting Action={fetchMeetingData} />
                </div>
                <div className="flex relative font-fontHubballi mt-40 ml-64 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="text-lg">
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Organizer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Meeting
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
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
                            {currentMeeting.map((meeting, index) => (
                                <tr key={meeting.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{meeting.organizer_details.username}</td>
                                    <td className="px-6 py-4">{meeting.title}</td>
                                    <td className="px-6 py-4">{meeting.description}</td>
                                    <td className="px-6 py-4">{meeting.date}</td>
                                    <td className="px-6 py-4">{meeting.start_time}</td>
                                    <td className="px-6 py-4">{meeting.end_time}</td>
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
                        {Array.from({ length: Math.ceil(meeting.length / ComplaintPerPage) }).map(
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
                                    Math.ceil(meeting.length / ComplaintPerPage)
                                    ? "cursor-not-allowed"
                                    : ""
                                    }`}
                                disabled={
                                    currentPage ===
                                    Math.ceil(meeting.length / ComplaintPerPage)
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

export default EmployeeMeetings