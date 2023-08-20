import React from "react";

function AdminVisitors() {
  return (
    <div className="relative mt-72 ml-28 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-lg">
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Visitor name
            </th>
            <th scope="col" className="px-6 py-3">
              Reason for visit
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Start_time
            </th>
            <th scope="col" className="px-6 py-3">
              End_time
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
            <td className="px-6 py-4">Interview</td>
            <td className="px-6 py-4">vishnu@gmail.com</td>
            <td className="px-6 py-4">04:55:00</td>
            <td className="px-6 py-4">05:55:00</td>
            <td className="px-6 py-4 text-green-600">Approved</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminVisitors;
