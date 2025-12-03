import { FC, ReactNode, useEffect, useState } from "react";
import DrawerAppBar from "@components/elements/navbar";
import { useRefreshTokenMutation } from "@components/redux/apis/auth";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "@components/elements/CustomAlert";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [getAccessToken] = useRefreshTokenMutation();
  const router = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem("collabQuotes_refreshToken");
    if (!refreshToken) return;
    getAccessToken({ refreshToken })
      .unwrap()
      .then()
      .catch((err) => {
        if (err.data.message == "token expired") {
          CustomToast({
            message: "Your Session finished, please login ",
            type: "error",
          });
        }
      });
  }, []);

  return (
    <>
      <DrawerAppBar />
      {children}
      <Toaster />
    </>
  );
};

export default ContextWrapper;
