import React, { useEffect, useState } from "react";
import { fetchVisitors, deleteVisitor } from "../../data/VisitorApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BACKEND_BASE_URL } from "../../api/Api";
import Swal from 'sweetalert2';
import axios from "axios";


function AdminVisitors() {

  const [visitors, setVisitors] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const visitorPerPage = 3;

  useEffect(() => {
    fetchVisitorData();
  }, [currentPage]);

  const fetchVisitorData = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/visitor/`, {
        headers: {
          Accept: "application/json",
        },
      });
      setVisitors(response.data);
    } catch (error) {
      console.error("Error fetching visitor data:", error.message);
    }
  };

  const handleDelete = async (visitorId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete this visitor?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      });
      if (result.isConfirmed) {
        axios.delete(`${BACKEND_BASE_URL}/visitor/${visitorId}/`);
        setVisitors((prevVisitors) => prevVisitors.filter((visitor) => visitor.id !== visitorId));
      }
    }
    catch (error) {
      console.error("Error deleting visitor:", error);
    }
  };

  const indexOfLastVisitor = currentPage * visitorPerPage;
  const indexOfFirstVisitor = indexOfLastVisitor - visitorPerPage;
  const currentVisitor = visitors.slice(indexOfFirstVisitor, indexOfLastVisitor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative mt-36 ml-28 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-lg">
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Visitor name
            </th>
            <th scope="col" className="px-6 py-3">
              Reason for visit
            </th>
            <th scope="col" className="px-6 py-3">
              Email
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
          {currentVisitor.map((visitor, index) => (
            <tr key={visitor.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{visitor.name}</td>
              <td className="px-6 py-4">{visitor.reason}</td>
              <td className="px-6 py-4">{visitor.email}</td>
              <td className="px-6 py-4">{visitor.start_time}</td>
              <td className="px-6 py-4">{visitor.end_time}</td>
              <td className="px-6 py-4">
                <div className="flex flex-row justify-around">
                  <RiDeleteBin6Line className="text-red-500 text-2xl cursor-pointer" onClick={() => handleDelete(visitor.id)} />
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
            {Array.from({ length: Math.ceil(visitors.length / visitorPerPage) }).map(
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
                  Math.ceil(visitors.length / visitorPerPage)
                  ? "cursor-not-allowed"
                  : ""
                  }`}
                disabled={
                  currentPage ===
                  Math.ceil(visitors.length / visitorPerPage)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminVisitors;
