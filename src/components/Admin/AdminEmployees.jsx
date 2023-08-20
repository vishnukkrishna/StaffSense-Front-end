import React from "react";
import { FiEdit } from "react-icons/fi";
import { Button } from "@material-tailwind/react";

function AdminEmployees() {
  return (
    <div className="relative mt-72 ml-28 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
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
          <tr className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
            >
              1111
            </th>
            <td className="px-6 py-4">Vishnu</td>
            <td className="px-6 py-4">Support</td>
            <td className="px-6 py-4">9876543210</td>
            <td className="px-6 py-4">vishnu@gmail.com</td>
            <td className="px-6 py-4">jr.Engineer</td>
            <td className="px-6 py-4">
              <div className="flex justify-between w-max gap-4">
                <FiEdit className="text-black text-3xl" />
                <Button size="sm" className="bg-customColor">
                  Block
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminEmployees;
