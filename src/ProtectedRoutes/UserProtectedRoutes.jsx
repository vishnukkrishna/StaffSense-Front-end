import jwt_decode from "jwt-decode";
import { React, useContext } from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoutes = ({ children, ...rest }) => {
  const token = localStorage.getItem("access_token");
  console.log("token in protected", token);
  if (token) {
    const usertoken = jwt_decode(token);
    console.log("user token", usertoken);
    const is_admin = usertoken?.is_admin;
    if (is_admin) {
      // User is  an admin, redirect to the user page
      return <Navigate to="/user" />;
    } else {
      // User is not admin, so allow access to the protected route
      return <>{children}</>;
    }
  } else {
    // Token is not present, redirect to the admin page
    return <Navigate to="/user" />;
  }
};

export default UserProtectedRoutes;
