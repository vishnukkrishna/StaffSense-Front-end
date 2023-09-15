import React, { useEffect, useState } from "react";
import Swal from "sweetalert";

import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../api/Api";

function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);


  useEffect(() => {
    fetchLeaves();
  }, []);

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
            console.log(response);
            setLeaves(response.data);
            console.log(leaves);
            fetchLeaves()
          })
          .catch((error) => {
            console.error("Error updating leave request status:", error);
          });
      } else {
        console.log("User canceled the action.");
      }
    });
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
          {leaves.map((leave) => (
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
    </div>
  );
}

export default AdminLeaves;
