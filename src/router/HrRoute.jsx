import React from "react";
import useAuth from "../hook/useAuth";
import useHr from "../hook/useHr";
import { Navigate, useLocation } from "react-router-dom";

const HrRoute = ({children}) => {
  const { user, loading } = useAuth();
  const [isHr, isHrLoading] = useHr();
  const location = useLocation();

  if (loading || isHrLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isHr) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default HrRoute;
