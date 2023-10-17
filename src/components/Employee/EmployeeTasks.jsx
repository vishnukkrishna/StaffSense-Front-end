import React, { useState, useEffect, useContext } from "react";
import { BACKEND_BASE_URL } from "../../api/Api";
import axios from "axios";
import AuthContext from "../Contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  // Add state variables for search
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchUserTasks();
  }, [user, currentPage]);

  useEffect(() => {
    // Update filtered tasks whenever searchQuery changes
    filterTasks();
  }, [searchQuery, tasks]);

  const fetchUserTasks = async () => {
    try {
      const userId = user.user_id;
      const response = await axios.get(
        `${BACKEND_BASE_URL}/project/individualtasks/${userId}/`
      );
      const data = response.data;
      setTasks(data);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.patch(
        `${BACKEND_BASE_URL}/project/usertasks/${taskId}/`,
        {
          status: newStatus,
        }
      );
      fetchUserTasks();
      toast.success("Status updated")
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const getStatusColor = (state) => {
    switch (state) {
      case "NEW":
        return "bg-yellow-400 text-dark";
      case "PENDING":
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
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to filter tasks based on searchQuery
  const filterTasks = () => {
    if (searchQuery.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => {
        return (
          task.project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.assignedTo[0].email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.start_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.end_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.state.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredTasks(filtered);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="font-fontHubballi px-32 overflow-x-auto w-full h-full">
        <form style={{ maxWidth: "700px", margin: "100px auto" }}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-base text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Tasks"
              value={searchQuery}
              onChange={handleSearchInputChange}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <table className="w-full shadow-md sm:rounded-lg text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-lg text-center">
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
              <tr
                key={task.id}
                className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700"
              >
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
                      onChange={(event) =>
                        updateTaskStatus(task.id, event.target.value)
                      }
                      className={`${getStatusColor(task.state)} border cursor-pointer border-black rounded-md `}
                    >
                      <option
                        value="NEW"
                        hidden={
                          task.state === "PENDING" ||
                          task.state === "IN PROGRESS" ||
                          task.state === "NEW"
                        }
                      >
                        New
                      </option>
                      <option
                        value="PENDING"
                        hidden={
                          task.state === "PENDING" ||
                          task.state === "IN PROGRESS"
                        }
                      >
                        Pending
                      </option>
                      <option
                        value="IN PROGRESS"
                        hidden={task.state === "IN PROGRESS"}
                      >
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
        <div className="flex justify-end items-center mt-2 mr-6">
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
              {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }).map(
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
                    Math.ceil(filteredTasks.length / tasksPerPage)
                    ? "cursor-not-allowed"
                    : ""
                    }`}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredTasks.length / tasksPerPage)
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

export default EmployeeTasks;
