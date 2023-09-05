import React, { useEffect, useState } from "react";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import AddEmployee from "../Modal/AdminModal/AddEmployee";
import { BACKEND_BASE_URL } from "../../api/Api";
import Swal from 'sweetalert2';
import EditEmployee from "../Modal/AdminModal/EditEmployee";
import { FaSearch } from "react-icons/fa";
// import { logout } from "../../pages/Authentication/Auth";

function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  // const [search, setSearch] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 3

  // async function searchUser(keyword) {
  //   try {
  //     const response = await axios.get(`${BACKEND_BASE_URL}/user/adminsearchEmployee/?search=${keyword}`);
  //     setEmployees(response.data);
  //   } catch (error) {
  //     console.error("Error searching employees:", error);
  //   }
  // }



  const handleBlockUser = () => {
    Swal.fire({
      title: 'Block User',
      text: 'Are you sure you want to block this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        blockUser();
      }
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/user/employelist/`
      );
      setEmployees(response.data);
      console.log("Employee data:", response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const BlockModal = ({ employeeId, isBlocked }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [shouldReload, setShouldReload] = useState(false);

    const openModal = (e) => {
      e.preventDefault();
      setIsOpen(true);
    };

    const closeModal = (e) => {
      e.preventDefault();
      setIsOpen(false);
      // setShouldReload(true);
    };

    // useEffect(() => {
    //   if (shouldReload) {
    //     window.location.reload();
    //     setShouldReload(false);
    //   }
    // }, [shouldReload]);

    const handleBlockEmployee = () => {
      setIsOpen(false);
      blockEmployee(employeeId);
      // window.location.reload();
    };

    const handleUnblockEmployee = () => {
      setIsOpen(false);
      unblockEmployee(employeeId);
      // window.location.reload();
    };

    const blockEmployee = (employeeId) => {
      axios
        .put(`${BACKEND_BASE_URL}/user/blockemployees/${employeeId}/`)
        .then((response) => {
          console.log("Employee blocked successfully");
          fetchData()
        })
        .catch((error) => {
          console.error("Error blocking employee:", error);
        });
    };

    const unblockEmployee = (employeeId) => {
      axios
        .put(`${BACKEND_BASE_URL}/user/unblockemployees/${employeeId}/`)
        .then((response) => {
          console.log("Employee unblocked successfully");
        })
        .catch((error) => {
          console.error("Error unblocking employee:", error);
        });
    };


    // const [isOpen, setIsOpen] = useState(false);
    // const [shouldReload, setShouldReload] = useState(false);

    // const openModal = (e) => {
    //   e.preventDefault();
    //   setIsOpen(true);
    // };

    // const closeModal = (e) => {
    //   e.preventDefault();
    //   setIsOpen(false);
    //   setShouldReload(true);
    // };

    // useEffect(() => {
    //   if (shouldReload) {
    //     window.location.reload();
    //     setShouldReload(false);
    //   }
    // }, [shouldReload]);

    // const blockEmployee = async (employeeId) => {
    //   try {
    //     const response = await axios.put(
    //       `${BACKEND_BASE_URL}/user/blockemployees/${employeeId}/`
    //     );
    //     console.log("Employee blocked successfully", response.data);

    //     // Logout the user after blocking
    //     // const logoutAction = logout();
    //     // return logoutAction;
    //   } catch (error) {
    //     console.error("Error blocking employee:", error);
    //   }
    // };

    // const unblockEmployee = async (employeeId) => {
    //   try {
    //     const response = await axios.put(
    //       `${BACKEND_BASE_URL}/user/unblockemployees/${employeeId}/`
    //     );
    //     console.log("Employee unblocked successfully", response.data);

    //     // Logout the user after unblocking
    //     // const logoutAction = logout();
    //     // return logoutAction;
    //   } catch (error) {
    //     console.error("Error unblocking employee:", error);
    //   }
    // };

    // const handleBlockEmployee = () => {
    //   setIsOpen(false);
    //   blockEmployee(employeeId).then((logoutAction) => {
    //     // Redirect to the login page
    //     return logoutAction;
    //   });
    // };

    // const handleUnblockEmployee = () => {
    //   setIsOpen(false);
    //   unblockEmployee(employeeId).then((logoutAction) => {
    //     // Redirect to the login page
    //     return logoutAction;
    //   });
    // };



    return (
      <div>
        <Button
          onClick={openModal}
          size="sm"
          className={`${isBlocked ? "bg-red-900" : "bg-green-700"
            } hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded`}
        >
          {isBlocked ? "Unblock" : "Block"}
        </Button>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-blue-gray-200 w-64 p-6 rounded shadow-lg border-8">
              <div className="text-gray-800 mb-4">
                {isBlocked
                  ? "Are you sure you want to unblock this employee?"
                  : "Are you sure you want to block this employee?"}
              </div>
              <div className="flex justify-end">
                {isBlocked ? (
                  <button
                    onClick={handleUnblockEmployee}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Yes
                  </button>
                ) : (
                  <button
                    onClick={handleBlockEmployee}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Yes
                  </button>
                )}
                <button
                  onClick={closeModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="mt-10 pl-20">
        <AddEmployee />
      </div>
      <div className="font-fontHubballi relative mt-36 mr-44 overflow-x-auto shadow-md sm:rounded-lg w-3/4 h-full">
        {/* <div className="relative flex w-full gap-2 md:w-max ml-96 mt-2">
          <Input
            type="search"
            label="Type here..."
            className="pr-20"
            onChange={e => searchUser(e.target.value)}
            containerProps={{
              className: "min-w-[288px]",
            }}
            icon={<FaSearch className="h-5 w-5" />}
          />
        </div> */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-7">
          <thead className="text-xl text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-lg">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Number
              </th>
              <th scope="col" className="px-6 py-3">
                Email Address
              </th>
              <th scope="col" className="px-6 py-3">
                Designation
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((employee) => (
              <tr key={employee.id} className="text-black border-b text-lg text-center dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
                >
                  {employee.id}
                </th>
                <td className="px-6 py-4">{employee.first_name} {employee.last_name}</td>
                <td className="px-6 py-4">{employee.department_name}</td>
                <td className="px-6 py-4">{employee.phone}</td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.designation}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-between w-max gap-4">
                    <EditEmployee id={employee.id} Action={fetchData} />
                    <BlockModal Action={fetchData}
                      employeeId={employee.id}
                      isBlocked={employee.is_blocked}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex mt-10 justify-center items-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />Previous
          </Button>
          <div className="flex items-center gap-2">pages {currentPage} of {Math.ceil(employees.length / itemPerPage)}</div>
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            disabled={currentPage === Math.ceil(employees.length / itemPerPage)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminEmployees;
