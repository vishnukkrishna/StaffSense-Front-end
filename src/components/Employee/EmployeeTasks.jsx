import React from "react";

function EmployeeTasks() {
  return (
    <div className="relative mt-72 ml-28 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-lg text-center">
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3">
              Task Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Assigned To
            </th>
            <th scope="col" className="px-6 py-3">
              Start_date
            </th>
            <th scope="col" className="px-6 py-3">
              End_date
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
            <td className="px-6 py-4">myproject</td>
            <td className="px-6 py-4">Front End</td>
            <td className="px-6 py-4">Back End</td>
            <td className="px-6 py-4">vishnu@gmail.com</td>
            <td className="px-6 py-4">2023-08-27</td>
            <td className="px-6 py-4">2023-08-27</td>
            <td className="px-6 py-4">
              <select
                id="tasks"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Select Your Status</option>
                <option value="US">New</option>
                <option value="CA">Pending</option>
                <option value="FR">In Progress</option>
                <option value="DE">Completed</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTasks;
