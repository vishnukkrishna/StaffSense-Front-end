import React, { useEffect, useState, useContext } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import axios from "axios";
import AuthContext from "../../components/Contexts/AuthContext";
import InNavList from '../../components/NavBar/InNavList'
import { Helmet } from 'react-helmet'
import AddComplaint from '../../components/Modal/EmployeeModal/AddComplaint'

function EmployeeComplaintPage() {

    const [complaints, setComplaints] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user.user_id) {
            fetchComplaints();
        }
    }, [user]);

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

    if (!user || !user.user_id) {
        return <div>Loading user information...</div>;
    }

    return (
        <div>
            <Helmet>
                <title>
                    Employee Complaints | Staffsense
                </title>
            </Helmet>
            <div>
                <InNavList />
            </div>
            <div className="mt-10 pl-20">
                <AddComplaint />
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
                        {complaints.map((complaint) => (
                            <tr key={complaint.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                                >
                                    {complaint.id}
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
        </div>
    )
}

export default EmployeeComplaintPage