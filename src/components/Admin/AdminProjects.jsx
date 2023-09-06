import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "./../../api/Api";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddProject from "../Modal/AdminModal/AddProject";
import EditProject from "../Modal/AdminModal/EditProject";

function AdminProjects() {
  const [project, setProject] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [employees, setEmployees] = useState([]);

  const handleEditSubmission = () => {
    fetchProjectData();
  };
  const getAssignedToEmail = (assignedToId) => {
    const employee = employees.find((emp) => emp.id === assignedToId);
    return employee ? employee.email : "";
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/user/employelist/`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => { });
  }, []);

  useEffect(() => {
    fetchProjectData();
  }, [refresh]);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/project/projects/`);
      console.log(response, "resposeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      const sortedProjects = response.data.sort((a, b) => a.id - b.id);
      setProject(response.data);
      console.log(response.data, "oooooooooooooooooooo");
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
        <AddProject Action={handleAdminChange} />
      </div>

      <div className="relative mt-52 mr-40 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
        <table className="w-full font-fontHubballi text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-lg">
              {/* <th scope="col" className="px-6 py-3">
                Id
              </th> */}
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
            {project.map((project) => (
              <tr className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                {/* <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >
                  {project.id}
                </th> */}
                <td className="px-6 py-4">{project.name}</td>
                <td className="px-6 py-4">{project.description}</td>
                <td className="px-6 py-4">{getAssignedToEmail(project.assignedTo)}</td>
                <td className="px-6 py-4">{project.start_date}</td>
                <td className="px-6 py-4">{project.end_date}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row justify-around cursor-pointer">
                    <EditProject id={project.id} onEditSubmission={handleEditSubmission} />
                    <RiDeleteBin6Line className="text-red-500 text-3xl" onClick={() => handleDelete(project.id)} />
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
