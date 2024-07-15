import { useAppSelector } from "@/hooks/useRedux";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default Protected;
