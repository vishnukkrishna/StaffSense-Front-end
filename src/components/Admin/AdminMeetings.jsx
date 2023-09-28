import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/Api";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import EditMeeting from "../Modal/AdminModal/EditMeeting";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminMeetings() {
  const [meeting, setMeeting] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const meetPerPage = 3;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/meeting/meetings/`);
      setMeeting(response.data);
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Do you really want to delete this meeting?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      });
      if (result.isConfirmed) {
        await axios.delete(`${BACKEND_BASE_URL}/meeting/meetings/${id}/`);
        console.log("Meeting deleted successfully");

        setMeeting((prevMeeting) =>
          prevMeeting.filter((meeting) => meeting.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting meeting:", error);
    }
  };

  const indexOfLastMeet = currentPage * meetPerPage;
  const indexOfFirstMeet = indexOfLastMeet - meetPerPage;
  const currentMeet = meeting.slice(indexOfFirstMeet, indexOfLastMeet);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <ToastContainer />
      <div className="relative mt-40 ml-28 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentMeet.map((meeting, index) => (
              <tr key={meeting.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
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
                <td className="px-6 py-4">
                  <div className="flex flex-row justify-around">
                    <EditMeeting id={meeting.id} Action={fetchData} />
                    <RiDeleteBin6Line onClick={() => handleDelete(meeting.id)} className="text-red-500 text-2xl cursor-pointer" />
                  </div>
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
              {Array.from({ length: Math.ceil(meeting.length / meetPerPage) }).map(
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
                    Math.ceil(meeting.length / meetPerPage)
                    ? "cursor-not-allowed"
                    : ""
                    }`}
                  disabled={
                    currentPage ===
                    Math.ceil(meeting.length / meetPerPage)
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
  );
}

export default AdminMeetings;
