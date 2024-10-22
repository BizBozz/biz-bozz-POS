// import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../hook/auth/AuthContext.jsx";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get authentication state from context

  if (!isAuthenticated) {
    return useEffect(() => {
      navigate("/login");
    }, []);
  } else {
    return children;
  }
};

export default PrivateRoute;
