import React from "react";

function AdminLeaves() {
  return (
    <div className="relative mt-72 ml-28 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-lg">
            <th scope="col" className="px-6 py-3">
              Id
            </th>
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
            <td className="px-6 py-4">vishnu</td>
            <td className="px-6 py-4">vishnu@gmail.com</td>
            <td className="px-6 py-4">Python Django</td>
            <td className="px-6 py-4">Fever</td>
            <td className="px-6 py-4">2023-08-27</td>
            <td className="px-6 py-4">2023-08-27</td>
            <td className="px-6 py-4 text-green-600">Approved</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminLeaves;
