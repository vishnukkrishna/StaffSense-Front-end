import React, { useEffect, useState } from "react";
import AddMeeting from '../Modal/EmployeeModal/AddMeeting';
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/Api";
import { ToastContainer } from "react-toastify";

function EmployeeMeetings() {

    const [meeting, setMeeting] = useState([]);

    useEffect(() => {
        fetchMeetingData();
    }, []);

    const fetchMeetingData = async () => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}/meeting/meetings/`);
            setMeeting(response.data);
        } catch (error) {
            console.error("Error fetching meeting data:", error);
        }
    };

    return (
        <div>
            <div className="mt-10 pl-20">
                <ToastContainer />
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
                        {meeting.map((meeting, index) => (
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
    )
}

export default EmployeeMeetings