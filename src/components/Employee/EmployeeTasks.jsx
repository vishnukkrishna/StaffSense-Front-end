import React, { useState, useEffect, useContext } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import axios from "axios";
import AuthContext from "../Contexts/AuthContext";

function EmployeeTasks() {

  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  useEffect(() => {
    fetchUserTasks();
  }, [user, currentPage]);

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
        return "bg-blue-500 text-dark";
      case "COMPLETED":
        return "bg-green-500 text-dark";
      default:
        return "bg-gray-500 text-dark";
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (

    <div className="font-fontHubballi mt-52 px-32 overflow-x-auto w-full h-full">
      <table className="w-full shadow-md sm:rounded-lg text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-lg text-center">
            {/* <th scope="col" className="px-6 py-3">
              Id
            </th> */}
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
              Assigned From
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
          {currentTasks.map((task) => (
            <tr key={task.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
              {/* <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {task.id}
              </th> */}
              <td className="px-6 py-4">{task.project.name}</td>
              <td className="px-6 py-4">{task.name}</td>
              <td className="px-6 py-4">{task.description}</td>
              <td className="px-6 py-4">staffsense222@gmail.com</td>
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
                    className={`${getStatusColor(task.state)} border cursor-pointer border-black rounded-md `}
                  >
                    <option value="NEW" hidden={task.state === "PENDING" || task.state === "IN PROGRESS" || task.state === "NEW"}>New</option>
                    <option value="PENDING" hidden={task.state === "PENDING" || task.state === "IN PROGRESS"}>
                      Pending
                    </option>
                    <option value="IN PROGRESS" hidden={task.state === "IN PROGRESS"}>
                      In Progress
                    </option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                )}
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
            {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map(
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
                  Math.ceil(tasks.length / tasksPerPage)
                  ? "cursor-not-allowed"
                  : ""
                  }`}
                disabled={
                  currentPage ===
                  Math.ceil(tasks.length / tasksPerPage)
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default EmployeeTasks;
