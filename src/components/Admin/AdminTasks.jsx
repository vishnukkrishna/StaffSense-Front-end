import React, { useState, useEffect } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import axios from "axios";
import AddTask from "../Modal/AdminModal/AddTask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const taskPerPage = 3;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/project/tasks/`);
        const data = response.data;
        console.log(data, "yesss");
        const sortedTask = response.data.sort((a, b) => a.id - b.id);
        setTasks(sortedTask);
        // toast.success("Task submitted successfully");
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed");
      }
    };

    fetchTasks();
  }, [refresh, currentPage]);

  const handleProjectAdminChange = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const indexOfLastTask = currentPage * taskPerPage;
  const indexOfFirstTask = indexOfLastTask - taskPerPage;
  const currentTask = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <ToastContainer />
      <div className="mt-10 pl-20">
        <AddTask onChange={handleProjectAdminChange} />
      </div>
      <div className="relative font-fontHubballi mt-52 mr-32 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-lg">
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
            {currentTask.map((task, index) => (
              <tr key={task.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                {/* <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th> */}
                <td className="px-6 py-4">{task.project.name}</td>
                <td className="px-6 py-4">{task.name}</td>
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">{task.assignedTo[0]?.email}</td>
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
              {Array.from({ length: Math.ceil(tasks.length / taskPerPage) }).map(
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
                    Math.ceil(tasks.length / taskPerPage)
                    ? "cursor-not-allowed"
                    : ""
                    }`}
                  disabled={
                    currentPage ===
                    Math.ceil(tasks.length / taskPerPage)
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default AdminTasks;
