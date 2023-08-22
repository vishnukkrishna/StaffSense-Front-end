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
import AdminLoginPage from "./pages/Authentication/EmployeeLoginPage";
import EmployeeLoginPage from "./pages/Authentication/AdminLoginPage";
import AdminDashBoardPage from "./pages/Admin/AdminDashBoardPage";
import EmployeeLandingPage from "./components/Employee/EmployeeLandingPage";

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

            {/* Employee Side */}
            <Route
              path="/home"
              element={
                <EmployeeLandingPage />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
