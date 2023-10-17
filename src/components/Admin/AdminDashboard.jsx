import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../api/Api";
import { ToastContainer } from "react-toastify";

function AdminDashboard() {

  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [meetingCount, setMeetingCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/leave/dashboard_data/`
      );
      const data = response.data;
      setEmployeeCount(data.employeeCount);
      setDepartmentCount(data.departmentCount);
      setVisitorsCount(data.visitorsCount);
      setMeetingCount(data.meetingCount)
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="font-fontHubballi mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="flex flex-wrap justify-center -mx-4">
          {/* Card 1 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="h-52 w-52 bg-gray-100 rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-white hover:shadow-xl">
              <svg className="h-14" viewBox="0 0 177 171">
                {/* SVG Path and Ellipse here */}
              </svg>
              <span className="mt-6 text-2xl leading-5 font-semibold text-center">Total Employees</span>
              <p className="text-center mt-3 text-3xl text-customColor font-bold">{employeeCount}</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="h-52 w-52 bg-gray-100 rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-white hover:shadow-xl">
              <svg className="h-14" viewBox="0 0 177 171">
                {/* SVG Path and Ellipse here */}
              </svg>
              <span className="mt-6 text-2xl leading-5 font-semibold text-center">Total Departments</span>
              <p className="text-center mt-3 text-3xl text-customColor font-bold">{departmentCount}</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="h-52 w-52 bg-gray-100 rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-white hover:shadow-xl">
              <svg className="h-14" viewBox="0 0 177 171">
                {/* SVG Path and Ellipse here */}
              </svg>
              <span className="mt-6 text-2xl leading-5 font-semibold text-center">Daily Visitors</span>
              <p className="text-center mt-3 text-3xl text-customColor font-bold">{visitorsCount}</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="h-52 w-52 bg-gray-100 rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-white hover:shadow-xl">
              <svg className="h-14" viewBox="0 0 177 171">
                {/* SVG Path and Ellipse here */}
              </svg>
              <span className="mt-6 text-2xl leading-5 font-semibold text-center">Today’s Booking</span>
              <p className="text-center mt-3 text-3xl text-customColor font-bold">{meetingCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
