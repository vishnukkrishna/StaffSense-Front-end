import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDepartment from "../Modal/AdminModal/AddDepartment";
import axios from "axios";
import Swal from 'sweetalert2';


function AdminDepartments() {
  const [department, setDepartment] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const deptPerPage = 3;

  useEffect(() => {
    fetchDepartments();
  }, [currentPage]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/user/departments/`);
      setDepartment(response.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const handleDepartmentAdded = (newDepartment) => {
    setDepartment([...department, newDepartment]);
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Do you really want to delete this department?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        await axios.delete(`${BACKEND_BASE_URL}/user/departments/${id}/`);
        console.log('Department deleted successfully');

        setDepartment((prevDepartments) => prevDepartments.filter(dept => dept.id !== id));
      }
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const indexOfLastDept = currentPage * deptPerPage;
  const indexOfFirstDept = indexOfLastDept - deptPerPage;
  const currentDept = department.slice(indexOfFirstDept, indexOfLastDept);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="mt-10 pl-20">
        <AddDepartment onDepartmentAdded={handleDepartmentAdded} />
      </div>
      <div className="relative mt-44 ml-36  overflow-x-auto shadow-md sm:rounded-lg w-6/12 h-full">
        <table className="w-full font-fontHubballi text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-lg">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Department Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDept.map((dept, index) => (
              <tr className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700" key={dept.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >{index + 1}
                </th>
                <td className="px-6 py-4">{dept.name}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row justify-around">
                    <RiDeleteBin6Line className="text-red-500 text-2xl cursor-pointer" onClick={() => handleDelete(dept.id)} />
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
              {Array.from({ length: Math.ceil(department.length / deptPerPage) }).map(
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
                    Math.ceil(department.length / deptPerPage)
                    ? "cursor-not-allowed"
                    : ""
                    }`}
                  disabled={
                    currentPage ===
                    Math.ceil(department.length / deptPerPage)
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

export default AdminDepartments;
