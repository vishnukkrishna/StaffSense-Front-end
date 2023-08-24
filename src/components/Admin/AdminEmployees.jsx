import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { Button } from "@material-tailwind/react";
import AddEmployee from "../Modal/AdminModal/AddEmployee";
import { BACKEND_BASE_URL } from "../../api/Api";
import Swal from 'sweetalert2';


function AdminEmployees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemsPerPage = 3;
  const offset = currentPage * itemsPerPage;
  const paginatedData = employees.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(employees.length / itemsPerPage);

  const filteredData = paginatedData.filter((employee) => {
    const EmployeeNameMatch = employee.first_name
      .toLowerCase()
      .includes(search.toLowerCase());
    return EmployeeNameMatch;
  });

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_BASE_URL}/user/employelist/`
        );
        setEmployees(response.data);
        console.log("12", response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  const BlockModal = ({ employeeId, isBlocked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
      setShouldReload(true);
    };

    useEffect(() => {
      if (shouldReload) {
        window.location.reload();
        setShouldReload(false);
      }
    }, [shouldReload]);

    const handleBlockEmployee = () => {
      setIsOpen(false);
      blockEmployee(employeeId);
      window.location.reload();
    };

    const handleUnblockEmployee = () => {
      setIsOpen(false);
      unblockEmployee(employeeId);
      window.location.reload();
    };

    const blockEmployee = (employeeId) => {
      axios
        .put(`${BACKEND_BASE_URL}/user/blockemployees/${employeeId}/`)
        .then((response) => {
          console.log("Employee blocked successfully");
        })
        .catch((error) => {
          console.error("Error blocking employee:", error);
        });
    };

    const unblockEmployee = (employeeId) => {
      axios
        .put(`${BACKEND_BASE_URL}/user/unblockemployees/${employeeId}/`)
        .then((response) => {
          console.log("Employee unblocked successfully");
        })
        .catch((error) => {
          console.error("Error unblocking employee:", error);
        });
    };

    return (
      <div>
        <button
          onClick={openModal}
          className="modal-trigger bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isBlocked ? "Unblock" : "Block"}
        </button>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-64 p-6 rounded shadow-lg">
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
      <div className="relative mt-36 mr-44 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
        {filteredData.length > 0 ? (
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
              {filteredData.map((employee) => (
                <tr key={employee.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                  >
                    {employee.id}
                  </th>
                  <td className="px-6 py-4">{employee.first_name} {employee.last_name}</td>
                  <td className="px-6 py-4">{employee.department_name}</td>
                  <td className="px-6 py-4">{employee.phone}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.designation}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-between w-max gap-4">
                      <Link to={`/employeedit/${employee.id}`}>
                        <FiEdit className="text-black text-3xl cursor-pointer" />
                      </Link>
                      <Button onClick={BlockModal} size="sm" className="bg-indigo-500">
                        Block
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Employees found.</p>
        )}
      </div>
    </>
  );
}

export default AdminEmployees;
