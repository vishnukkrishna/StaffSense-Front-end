import React, { useEffect, useState } from "react";
import Swal from "sweetalert";

import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../api/Api";
import { toast } from "react-toastify";

function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const LeavePerPage = 3;

  useEffect(() => {
    fetchLeaves();
  }, [currentPage]);

  const fetchLeaves = () => {
    axios
      .get(`${BACKEND_BASE_URL}/leave/leaves/`)
      .then((response) => {
        const sortedData = response.data.sort((a, b) =>
          a.employee.username.localeCompare(b.employee.username)
        );
        setLeaves(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching leaves:", error);
      });
  };

  const handleApproveReject = (leaveId, isApproved, email) => {
    const data = { leave_id: leaveId, is_approved: isApproved, email: email };

    const confirmMessage = isApproved
      ? "Are you sure you want to approve this leave?"
      : "Are you sure you want to reject this leave?";

    Swal({
      title: "Confirmation",
      text: confirmMessage,
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
      dangerMode: true,

    }).then((confirmed) => {

      if (confirmed) {
        axios
          .put(`${BACKEND_BASE_URL}/leave/leaves/`, data)
          .then((response) => {
            setLeaves(response.data);
            fetchLeaves()
            toast.success("Successfully updated")
          })
          .catch((error) => {
            console.error("Error updating leave request status:", error);
          });
      } else {
        console.log("User canceled the action.");
      }
    });
  };

  const indexOfLastLeave = currentPage * LeavePerPage;
  const indexOfFirstLeave = indexOfLastLeave - LeavePerPage;
  const currentLeave = leaves.slice(indexOfFirstLeave, indexOfLastLeave);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative mt-40 ml-28 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-lg">
            {/* <th scope="col" className="px-6 py-3">
              Id
            </th> */}
            <th scope="col" className="px-6 py-3">
              Employee name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Department
            </th>
            <th scope="col" className="px-6 py-3">
              Reason for leave
            </th>
            <th scope="col" className="px-6 py-3">
              Start_date
            </th>
            <th scope="col" className="px-6 py-3">
              End_date
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Status
            </th> */}
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentLeave.map((leave) => (
            <tr key={leave.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
              {/* <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
              >
                {leave.id}
              </th> */}
              <td className="px-6 py-4">{leave.employee.username}</td>
              <td className="px-6 py-4">{leave.employee.email}</td>
              <td className="px-6 py-4">{leave.department.name}</td>
              <td className="px-6 py-4">{leave.reason}</td>
              <td className="px-6 py-4">{leave.start_date}</td>
              <td className="px-6 py-4">{leave.end_date}</td>
              {/* <td className="px-6 py-4">
                {leave.is_approved === true ? (
                  <span className="text-green-900 font-bold">
                    Approved
                  </span>
                ) : leave.is_approved === false ? (
                  <span className="text-red-900 font-bold">
                    Rejected
                  </span>
                ) : (
                  "Pending"
                )}
              </td> */}
              <td className="border px-4 py-2 ">
                {leave.is_approved === null ? (
                  <div>
                    <button
                      onClick={(e) =>
                        handleApproveReject(
                          leave.id,
                          true,
                          leave.employee.email
                        )
                      }
                      className="bg-green-500 cursor-pointer rounded p-1 mx-1 text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={(e) =>
                        handleApproveReject(
                          leave.id,
                          false,
                          leave.employee.email
                        )
                      }
                      className="bg-red-500 cursor-pointer rounded p-1 mx-1 text-white"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full">
                    {leave.is_approved === true ? (
                      <span className="text-green-500 font-bold text-lg">Approved</span>

                    ) : (
                      <span className="text-red-500 font-bold text-lg">Rejected</span>
                    )}
                  </div>
                )}
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
            {Array.from({ length: Math.ceil(leaves.length / LeavePerPage) }).map(
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
                  Math.ceil(leaves.length / LeavePerPage)
                  ? "cursor-not-allowed"
                  : ""
                  }`}
                disabled={
                  currentPage ===
                  Math.ceil(leaves.length / LeavePerPage)
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

export default AdminLeaves;
