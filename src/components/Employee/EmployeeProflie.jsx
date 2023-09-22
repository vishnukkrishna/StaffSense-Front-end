import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../Contexts/AuthContext";
import { BACKEND_BASE_URL } from "../../api/Api";
import profile from "../../images/profile-pic.jpg";
import EditEmployeeProfile from "../Modal/EmployeeModal/EditEmployeeProfile";
import EditEmployeePassword from "../Modal/EmployeeModal/EditEmployeePassword";
import { Collapse } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployeeProfile() {
  const [userData, setUserData] = useState(null);
  const { user } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const user_id = user && user.user_id;

  useEffect(() => {
    if (user_id) {
      fetchUserData();
    }
  }, [user, user_id]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("profile_pic", selectedFile);

    try {
      const response = await axios.put(
        `${BACKEND_BASE_URL}/user/upload-profile-picture/`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/user/userdetails/${user_id}/`
      );
      setUserData(response.data);
      console.log(response, "llllllllllllllllllllllll");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(userData, "---------user");

  return (
    <div className="w-full mt-20 font-fontHubballi">
      {userData ? (
        <div className="p-16">
          <div className="p-8 bg-white shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-gray-700 text-xl">22</p>
                  <p className="text-gray-500">Completed Tasks</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-xl">10</p>
                  <p className="text-gray-500">Leaves</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <div className="flex justify-end h-30 w-30 cursor-pointer">
                    {userData.profile_pic ? (
                      <img
                        src={`${BACKEND_BASE_URL}${userData.profile_pic}`}
                        alt="Profile"
                      />
                    ) : previewURL ? (
                      <img src={profile} alt="Profile" />
                    ) : (
                      <div className="w-48 h-48 bg-indigo-100 flex justify-center items-center rounded-full shadow-2xl">
                        <label htmlFor="upload" className="cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 text-indigo-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <input
                            id="upload"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <EditEmployeeProfile Action={fetchUserData} />
                <EditEmployeePassword />
                <ToastContainer />
              </div>
            </div>

            <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-semibold text-gray-700">
                {userData.first_name + " " + userData.last_name}
              </h1>
              <p className="font-light text-gray-600 mt-3 text-lg">
                {userData.designation}
              </p>
            </div>
          </div>
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-extrabold text-2xl text-gray-900 leading-8">
              <span className="text-indigo-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">ABOUT</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-lg">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">{userData.first_name}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">{userData.last_name}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No</div>
                  <div className="px-4 py-2">{userData.phone}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Designation</div>
                  <div className="px-4 py-2">{userData.designation}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Department</div>
                  <div className="px-4 py-2">
                    {userData.department ? userData.department.name : ""}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href={userData.email}>
                      {userData.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default EmployeeProfile;
