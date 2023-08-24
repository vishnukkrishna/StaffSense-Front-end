import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "./../../api/Api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddProject from "../Modal/AdminModal/AddProject";

function AdminProjects() {
  const [project, setProject] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjectData();
      setProject(data);
    };

    fetchData();
  }, [refresh]);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/project/projects/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Project data:", error);
      return [];
    }
  };


  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Do you really want to delete this project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });
      if (result.isConfirmed) {
        await axios.delete(`${BACKEND_BASE_URL}/project/projects/${id}/`);
        console.log("Project deleted successfully");

        setProject((prevProject) =>
          prevProject.filter((project) => project.id !== id)
        );

        Swal.fire("Deleted!", "Project has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleAdminChange = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };
  return (
    <>
      <div className="mt-10 pl-20">
        <AddProject onChange={handleAdminChange} />
      </div>

      <div className="relative mt-52 mr-40 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
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
            {project.map((project) => (
              <tr className="text-black border-b text-base text-center dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >
                  {project.id}
                </th>
                <td className="px-6 py-4">{project.name}</td>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">{project.start_date}</td>
                <td className="px-6 py-4">{project.end_date}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row justify-around">
                    <FiEdit className="text-black text-2xl" />
                    <RiDeleteBin6Line className="text-red-500 text-2xl" onClick={() => handleDelete(project.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminProjects;
