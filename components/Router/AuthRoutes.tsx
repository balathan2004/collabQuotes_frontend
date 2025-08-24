import React from "react";
import AccountVerification from "@components/pages/verifyAccount";
import ResetPassword from "@components/pages/reset-password";
import ChangePassword from "@components/pages/change_password";
import RequestVerification from "@components/pages/request_verification";
import Login from "@components/pages/login";
import SignUp from "@components/pages/register";

import { Route } from "react-router-dom";
export default function AuthRoutes() {
  return (
    <>
      <Route path="/auth/verify" element={<AccountVerification />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/change-password" element={<ChangePassword />} />
      <Route
        path="/auth/request-verification"
        element={<RequestVerification />}
      />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<SignUp />} />
    </>
  );
}
