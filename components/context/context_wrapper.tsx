import { FC, ReactNode, useEffect, useState } from "react";
import DrawerAppBar from "@components/elements/navbar";
import { useRefreshTokenMutation } from "@components/redux/apis/auth";
import { Toaster } from 'react-hot-toast';

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {

  const [getAccessToken] = useRefreshTokenMutation()

  useEffect(() => {
    const refreshToken = localStorage.getItem("collabQuotes_refreshToken");
    if (!refreshToken) return
    getAccessToken({ refreshToken })
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
