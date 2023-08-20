import React from "react";
// import "./App.css";
import EmployeeLogin from "./pages/Authentication/EmployeeLoginPage";
import OutHomePage from "./components/Employee/OutHomePage";
import EmployeeLandingPage from "./components/Employee/EmployeeLandingPage";
import AdminDashBoardPage from "./pages/Admin/AdminDashBoardPage";
import EmployeeProfilePage from "./pages/Employee/EmployeeProfliePage";
import AdminProjectPage from "./pages/Admin/AdminProjectPage";
import AdminTasksPage from "./pages/Admin/AdminTasksPage";
import EmployeeTasksPage from "./pages/Employee/EmployeeTasksPage";
import AdminAnnouncementsPage from "./pages/Admin/AdminAnnouncementsPage";
import AdminEmployeesPage from "./pages/Admin/AdminEmployeesPage";
import AdminDepartmentPage from "./pages/Admin/AdminDepartmentPage";
import AdminMeetingsPage from "./pages/Admin/AdminMeetingsPage";
import AdminLeavesPage from "./pages/Admin/AdminLeavesPage";
import AdminVisitorPage from "./pages/Admin/AdminVisitorPage";

function App() {
  return (
    <>
      {/* <EmployeeLogin /> */}
      {/* <AdminLoginPage/> */}
      {/* <OutHomePage/> */}
      {/* <EmployeeLandingPage/> */}
      {/* <EmployeeProfilePage /> */}
      {/* <EmployeeTasksPage /> */}
      {/* <AdminDashBoardPage/> */}
      {/* <AdminProjectPage /> */}
      {/* <AdminTasksPage /> */}
      {/* <AdminAnnouncementsPage/> */}
      {/* <AdminEmployeesPage /> */}
      {/* <AdminDepartmentPage/> */}
      {/* <AdminMeetingsPage /> */}
      {/* <AdminLeavesPage /> */}
      <AdminVisitorPage />
    </>
  );
}

export default App;
