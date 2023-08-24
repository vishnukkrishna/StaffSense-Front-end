import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import AdminProtectedRoutes from "./ProtectedRoutes/AdminProtectedRoutes";
// import UserProtectedRoutes from "./ProtectedRoutes/UserProtectedRoutes";
import { AuthProvider } from "./components/Contexts/AuthContext";
import EmployeeLoginPage from "./pages/Authentication/EmployeeLoginPage";
import AdminLoginPage from "./pages/Authentication/AdminLoginPage";
import AdminDashBoardPage from "./pages/Admin/AdminDashBoardPage";
import EmployeeLandingPage from "./components/Employee/EmployeeLandingPage";
import OutHomePage from "./components/Employee/OutHomePage";
import AdminEmployeesPage from "./pages/Admin/AdminEmployeesPage";
import AdminProjectPage from "./pages/Admin/AdminProjectPage";
import AdminTasksPage from "./pages/Admin/AdminTasksPage";
import AdminDepartmentPage from "./pages/Admin/AdminDepartmentPage";
import EmployeeProfilePage from "./pages/Employee/EmployeeProfliePage";
import EmployeeTasksPage from "./pages/Employee/EmployeeTasksPage";

function App() {
  const token = localStorage.getItem("access_token");
  console.log("token here got", token);
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Authentication */}
            <Route
              path="/admin"
              element={
                token ? <Navigate to="/dashboard" /> : <AdminLoginPage />
              }
            />
            <Route
              path="/user"
              element={token ? <Navigate to="/home" /> : <EmployeeLoginPage />}
            />

            {/* Admin Side */}
            <Route path="/dashboard" element={<AdminDashBoardPage />} />
            <Route
              path="/userlist"
              element={
                <AdminEmployeesPage />
              }
            />
            <Route
              path="/projectlist"
              element={
                <AdminProjectPage />
              }
            />
            <Route
              path="/tasklist"
              element={
                <AdminTasksPage />
              }
            />
            <Route
              path="/department"
              element={
                <AdminDepartmentPage />
              }
            />
            <Route
              path="/meeting"
              element={
                <AdminTasksPage />
              }
            />
            <Route
              path="/chat"
              element={
                <AdminTasksPage />
              }
            />
            <Route
              path="/leave"
              element={
                <AdminTasksPage />
              }
            />
            <Route
              path="/visitor"
              element={
                <AdminTasksPage />
              }
            />
            <Route
              path="/complaint"
              element={
                <AdminTasksPage />
              }
            />
            <Route
              path="/announcement"
              element={
                <AdminTasksPage />
              }
            />

            {/* Employee Side */}
            <Route path="/" element={<OutHomePage />} />
            <Route
              path="/home"
              element={
                <EmployeeLandingPage />
              }
            />
            <Route
              path="/profileuser"
              element={
                <EmployeeProfilePage />
              }
            />
            <Route
              path="/usertask"
              element={
                <EmployeeTasksPage />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
