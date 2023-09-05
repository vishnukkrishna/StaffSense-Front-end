import jwt_decode from "jwt-decode";
import { React, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const UserProtectedRoutes = ({ children, ...rest }) => {
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get("/api/check-auth"); // Replace with your API endpoint
  //       const { isAuthenticated } = response.data;

  //       if (!isAuthenticated) {
  //         localStorage.removeItem("jwtToken");
  //         window.location.replace("/user");
  //       }
  //     } catch (error) {
  //     }
  //   };

  //   checkAuth();
  // }, []);

  const token = localStorage.getItem("access_token");
  console.log("token in protected", token);
  if (token) {
    const usertoken = jwt_decode(token);
    console.log("user token", usertoken);
    // if (usertoken.is_active === false) {
    //   <Navigate to="/user" />
    // }
    const is_admin = usertoken?.is_admin;
    if (is_admin) {
      return <Navigate to="/user" />;
    } else {
      return <>{children}</>;
    }
  } else {
    return <Navigate to="/user" />;
  }
};

export default UserProtectedRoutes;
