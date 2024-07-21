import { RedirectedTo } from "@/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { token, isAuthenticated, appLoadingState } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token) {
      dispatch(RedirectedTo(pathname));
    }
  }, [dispatch, token, pathname]);

  if (isAuthenticated) {
    return children;
  } else if(!appLoadingState && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
};

export default Protected;
