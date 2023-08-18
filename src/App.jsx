import React from "react";
// import "./App.css";
import EmployeeLogin from "./pages/Authentication/EmployeeLoginPage";
import OutHomePage from "./components/Employee/OutHomePage";
import EmployeeLandingPage from "./components/Employee/EmployeeLandingPage";
import TasksPage from "./pages/Employee/TasksPage";
import AdminDashBoardPage from "./pages/Admin/AdminDashBoardPage";
import EmployeeProfilePage from "./pages/Employee/EmployeeProfliePage";
import AdminLoginPage from "./pages/Authentication/AdminLoginPage";
import AdminProjectPage from "./pages/Admin/AdminProjectPage";

function App() {
  return (
    <>
      {/* <EmployeeLogin /> */}
      {/* <AdminLoginPage/> */}
      {/* <OutHomePage/> */}
      {/* <EmployeeLandingPage/> */}
      {/* <EmployeeProfilePage /> */}
      {/* <TasksPage/> */}
      {/* <AdminDashBoardPage/> */}
      <AdminProjectPage />
    </>
  );
}

export default App;
