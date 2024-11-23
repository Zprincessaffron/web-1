import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user,setUser } = useContext(userContext);
 

  // Loading state or fallback
  if (user === undefined) {
    return <div>Loading...</div>; // or some other loading indicator
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" />;
  }

  return children;
};

export default ProtectedRoute;
