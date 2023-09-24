import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddDepartment from "../Modal/AdminModal/AddDepartment";
import axios from "axios";
import Swal from 'sweetalert2';


function AdminDepartments() {
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

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
            {department.map((dept, index) => (
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
      </div>
    </>
  );
}

export default AdminDepartments;
