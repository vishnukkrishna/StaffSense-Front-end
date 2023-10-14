import React, { useEffect, useState } from "react";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import AddEmployee from "../Modal/AdminModal/AddEmployee";
import { BACKEND_BASE_URL } from "../../api/Api";
import Swal from 'sweetalert2';
import EditEmployee from "../Modal/AdminModal/EditEmployee";
import { toast } from "react-toastify";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 3;
  const [searchQuery, setSearchQuery] = useState("");

  const handleBlockUser = () => {
    Swal.fire({
      title: 'Block User',
      text: 'Are you sure you want to block this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        blockUser();
      }
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/user/employelist/`);
      const sortedEmployees = response.data.sort((a, b) => a.id - b.id);

      if (searchQuery.trim() === "") {
        setEmployees(sortedEmployees);
      } else {
        const filteredEmployees = sortedEmployees.filter((employee) => {
          return (
            employee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.department_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.designation.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });
        setEmployees(filteredEmployees);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const BlockModal = ({ employeeId, isBlocked }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (e) => {
      e.preventDefault();
      setIsOpen(true);
    };

    const closeModal = (e) => {
      e.preventDefault();
      setIsOpen(false);
    };


    const handleBlockEmployee = () => {
      setIsOpen(false);
      blockEmployee(employeeId);
    };

    const handleUnblockEmployee = () => {
      setIsOpen(false);
      unblockEmployee(employeeId);
    };

    const blockEmployee = (employeeId) => {
      axios
        .put(`${BACKEND_BASE_URL}/user/blockemployees/${employeeId}/`)
        .then((response) => {
          toast.success("Employee blocked successfully");
          fetchData();
        })
        .catch((error) => {
          console.error("Error blocking employee:", error);
        });
    };

    const unblockEmployee = (employeeId) => {
      axios
        .put(`${BACKEND_BASE_URL}/user/unblockemployees/${employeeId}/`)
        .then((response) => {
          toast.success("Employee unblocked successfully");
        })
        .catch((error) => {
          console.error("Error unblocking employee:", error);
        });
    };

    return (
      <div>
        <Button
          onClick={openModal}
          size="sm"
          className={`${isBlocked ? "bg-red-900" : "bg-green-700"
            } hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded`}
        >
          {isBlocked ? "Unblock" : "Block"}
        </Button>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-blue-gray-200 w-64 p-6 rounded shadow-lg border-8">
              <div className="text-gray-800 mb-4">
                {isBlocked
                  ? "Are you sure you want to unblock this employee?"
                  : "Are you sure you want to block this employee?"}
              </div>
              <div className="flex justify-end">
                {isBlocked ? (
                  <button
                    onClick={handleUnblockEmployee}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Yes
                  </button>
                ) : (
                  <button
                    onClick={handleBlockEmployee}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Yes
                  </button>
                )}
                <button
                  onClick={closeModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="mt-10 pl-20">
        <AddEmployee />
      </div>
      <div className="font-fontHubballi border-none relative mt-2 mr-44 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
        <form style={{ maxWidth: "700px", margin: "100px auto" }}>
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
              placeholder="Search Mockups, Logos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-7">
          <thead className="text-xl text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-lg">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email Address
              </th>
              <th scope="col" className="px-6 py-3">
                Designation
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((employee, index) => (
              <tr key={employee.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{employee.first_name} {employee.last_name}</td>
                <td className="px-6 py-4">{employee.department_name}</td>
                <td className="px-6 py-4">{employee.phone}</td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.designation}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-between w-max gap-4">
                    <EditEmployee id={employee.id} Action={fetchData} />
                    <BlockModal Action={fetchData}
                      employeeId={employee.id}
                      isBlocked={employee.is_blocked}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex mt-10 justify-center items-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />Previous
          </Button>
          <div className="flex items-center gap-2">pages {currentPage} of {Math.ceil(employees.length / itemPerPage)}</div>
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            disabled={currentPage === Math.ceil(employees.length / itemPerPage)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminEmployees;
