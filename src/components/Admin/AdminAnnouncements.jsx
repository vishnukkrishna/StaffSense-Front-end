import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function AdminAnnouncements() {
  return (
    <div className="relative mt-72 ml-28 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-lg text-center">
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Event
            </th>
            <th scope="col" className="px-6 py-3">
              Notes
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              1111
            </th>
            <td className="px-6 py-4">Onam Celebration</td>
            <td className="px-6 py-4">We are planning to celebrate Onam</td>
            <td className="px-6 py-4">
              <div className="flex flex-row justify-around">
                <FiEdit className="text-black text-2xl" />
                <RiDeleteBin6Line className="text-red-500 text-2xl" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminAnnouncements;
