import React, { useEffect, useState } from "react";
import { fetchVisitors } from "../../data/VisitorApi";
import { ToastContainer } from 'react-toastify'
import AddVisitors from '../Modal/EmployeeModal/AddVisitors'

function EmployeeVisitors() {

    const [visitors, setVisitors] = useState([]);

    useEffect(() => {
        fetchVisitorData();
    }, []);

    const fetchVisitorData = async () => {
        try {
            const data = await fetchVisitors();
            console.log(data, "visitor data");
            setVisitors(data);
        } catch (error) {
            console.error("Error fetching visitor data:", error.message);
        }
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
                            {visitors.map((visitor, index) => (
                                <tr className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">11</td>
                                    <td className="px-6 py-4">22</td>
                                    <td className="px-6 py-4">33</td>
                                    <td className="px-6 py-4">44</td>
                                    <td className="px-6 py-4">55</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default EmployeeVisitors