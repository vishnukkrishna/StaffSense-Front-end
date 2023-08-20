import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

function AdminDepartments() {
  return (
    <div className="relative mt-60 ml-72  overflow-x-auto shadow-md sm:rounded-lg w-6/12 h-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
          <tr className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
            >
              1111
            </th>
            <td className="px-6 py-4">Python Django</td>
            <td className="px-6 py-4">
              <div className="flex flex-row justify-around">
                <RiDeleteBin6Line className="text-red-500 text-2xl" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminDepartments;
