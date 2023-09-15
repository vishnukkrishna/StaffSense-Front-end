import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminProtectedRoutes from "./ProtectedRoutes/AdminProtectedRoutes";
import UserProtectedRoutes from "./ProtectedRoutes/UserProtectedRoutes";
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
import EditProject from "./components/Modal/AdminModal/EditProject";
import EditEmployeeDetails from "./components/Modal/AdminModal/EditEmployeeDetails";
import AdminAnnouncementsPage from "./pages/Admin/AdminAnnouncementsPage";
import EmployeeComplaintPage from "./pages/Employee/EmployeeComplaintPage";
import AdminComplaintsPage from "./pages/Admin/AdminComplaintsPage";
import Spinner from "./components/Spinner/Spinner";
import EmployeeLeavePage from "./pages/Employee/EmployeeLeavePage";
import EmployeeAppliedLeavePage from "./pages/Employee/EmployeeAppliedLeavePage";
import AdminLeavesPage from "./pages/Admin/AdminLeavesPage";
import EmployeeChatPage from "./pages/Employee/EmployeeChatPage";
import AdminChatsPage from "./pages/Admin/AdminChatsPage";

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
            <Route path="/dashboard" element={
              <AdminProtectedRoutes>
                <AdminDashBoardPage />
              </AdminProtectedRoutes>
            }
            />
            <Route
              path="/userlist"
              element={
                <AdminProtectedRoutes>
                  <AdminEmployeesPage />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/employeedit/:id"
              element={
                <AdminProtectedRoutes>
                  <EditEmployeeDetails />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/projectlist"
              element={
                <AdminProtectedRoutes>
                  <AdminProjectPage />
                </AdminProtectedRoutes>
              }
            />
            <Route path="/editproject/:projectId" element={
              <AdminProtectedRoutes>
                <EditProject />
              </AdminProtectedRoutes>
            }
            />
            <Route
              path="/tasklist"
              element={
                <AdminProtectedRoutes>
                  <AdminTasksPage />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/department"
              element={
                <AdminProtectedRoutes>
                  <AdminDepartmentPage />
                </AdminProtectedRoutes>
              }
            />
            <Route
              path="/meeting"
              element={
                <AdminTasksPage />
              }
            />
            <Route
              path="/adminchat"
              element={
                <AdminProtectedRoutes>
                  <AdminChatsPage />
                </AdminProtectedRoutes>
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
                <AdminComplaintsPage />
              }
            />
            <Route
              path="/announcement"
              element={
                <AdminAnnouncementsPage />
              }
            />
            <Route
              path="/adminleave"
              element={
                <AdminProtectedRoutes>
                  <AdminLeavesPage />
                </AdminProtectedRoutes>
              }
            />

            {/* Employee Side */}
            <Route path="/" element={<OutHomePage />} />
            <Route path="/spinner" element={<Spinner />} />
            <Route
              path="/home"
              element={
                <UserProtectedRoutes>
                  <EmployeeLandingPage />
                </UserProtectedRoutes>
              }
            />
            <Route
              path="/profileuser"
              element={
                <UserProtectedRoutes>
                  <EmployeeProfilePage />
                </UserProtectedRoutes>
              }
            />
            <Route
              path="/usertask"
              element={
                <UserProtectedRoutes>
                  <EmployeeTasksPage />
                </UserProtectedRoutes>
              }
            />
            <Route
              path="/usercomplaints"
              element={
                <UserProtectedRoutes>
                  <EmployeeComplaintPage />
                </UserProtectedRoutes>
              }
            />
            <Route
              path="/userleave"
              element={
                <UserProtectedRoutes>
                  <EmployeeLeavePage />
                </UserProtectedRoutes>
              }
            />
            <Route
              path="/userapplied"
              element={
                <UserProtectedRoutes>
                  <EmployeeAppliedLeavePage />
                </UserProtectedRoutes>
              }
            />
            <Route
              path="/userchats"
              element={
                <UserProtectedRoutes>
                  <EmployeeChatPage />
                </UserProtectedRoutes>
              }
            />

          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
