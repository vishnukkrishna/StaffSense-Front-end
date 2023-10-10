import jwt_decode from "jwt-decode";
import { React, useContext } from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ children, ...rest }) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const admin = jwt_decode(token);
    const is_admin = admin?.is_admin;
    return <>{is_admin ? children : <Navigate to="/admin" />}</>;
  } else {
    return <Navigate to="/admin" />;
  }
};



export default AdminProtectedRoutes;
