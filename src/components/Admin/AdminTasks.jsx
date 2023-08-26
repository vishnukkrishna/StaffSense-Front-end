import React, { useState, useEffect } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import axios from "axios";
import AddTask from "../Modal/AdminModal/AddTask";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/project/tasks/`);
        const data = response.data;
        console.log(data, "yesss");
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [refresh]);

  const handleProjectAdminChange = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const getStatusColor = (state) => {
    switch (state) {
      case "NEW":
        return "bg-yellow-400 text-dark";
      case "PENDING":
        return "bg-blue-500 text-dark";
      case "IN PROGRESS":
        return "bg-blue-500 text-dark";
      case "COMPLETED":
        return "bg-green-500 text-dark";
      default:
        return "bg-gray-500 text-dark";
    }
  };
  return (
    <>
      <div className="mt-10 pl-20">
        <AddTask onChange={handleProjectAdminChange} />
      </div>
      <div className="relative font-fontHubballi mt-52 mr-36 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-lg">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Project Name
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >
                  {task.id}
                </th>
                <td className="px-6 py-4">{task.project.name}</td>
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">{task.assignedTo[0].email}</td>
                <td className="px-6 py-4">{task.start_date}</td>
                <td className="px-6 py-4">{task.end_date}</td>
                <td>
                <span className={`p-2 rounded ${getStatusColor(task.state)}`} >
                {task.state}
                </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminTasks;
