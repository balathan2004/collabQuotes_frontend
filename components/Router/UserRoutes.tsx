import React, { ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "@components/redux/apis/authSlice";
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { accessToken, isPageLoading, isLogin } = useAuth();

  if (isPageLoading) {
    return (
      <div>
        <h1>page loading</h1>
      </div>
    );
  }

  if (!accessToken || !isLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
