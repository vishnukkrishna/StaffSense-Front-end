import React, { useState, useEffect, useContext } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import axios from "axios";
import AuthContext from "../Contexts/AuthContext";

function EmployeeTasks() {

  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUserTasks();
  }, [user]);

  const fetchUserTasks = async () => {
    try {
      const userId = user.user_id;

      const response = await axios.get(
        `${BACKEND_BASE_URL}/project/individualtasks/${userId}/`
      );
      const data = response.data;
      console.log(data, "user tasks");
      setTasks(data);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      console.log(taskId, newStatus, "GGGGGGG");

      const response = await axios.patch(
        `${BACKEND_BASE_URL}/project/usertasks/${taskId}/`,
        {
          status: newStatus,
        }
      );

      console.log("Response:", response.data);

      fetchUserTasks();

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const getStatusColor = (state) => {
    switch (state) {
      case "NEW":
        return "bg-yellow-400 text-dark";
      case "PENDING":
        return "bg-blue-500 text-dark";
      case "IN PROGRESS":
        return "bg-blue-500 text-white";
      case "COMPLETED":
        return "bg-green-500 text-dark";
      default:
        return "bg-gray-500 text-white";
    }
  };

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
          {tasks.map((task) => (
            <tr key={task.id} className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {task.id}
              </th>
              <td className="px-6 py-4">{task.project.name}</td>
              <td className="px-6 py-4">{task.name}</td>
              <td className="px-6 py-4">{task.description}</td>
              <td className="px-6 py-4">{task.assignedTo[0].email}</td>
              <td className="px-6 py-4">{task.start_date}</td>
              <td className="px-6 py-4">{task.end_date}</td>
              <td className="px-6 py-4">
                {task.state === "COMPLETED" ? (
                  <div
                    className={`state-resolved rounded-lg ${getStatusColor(
                      task.state
                    )}`}
                  >
                    COMPLETED
                  </div>
                ) : (
                  <select
                    id="tasks"
                    value={task.state}
                    onChange={(event) => updateTaskStatus(task.id, event.target.value)}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 state-select ${getStatusColor(task.state)}`}
                  >
                    <option value="NEW">New</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTasks;
