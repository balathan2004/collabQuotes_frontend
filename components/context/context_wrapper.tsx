import { FC, ReactNode, useEffect } from "react";

import ReplyPopUp from "@components/elements/ReplyPopUp";
import DrawerAppBar from "@components/elements/navbar";
import { useRefreshTokenQuery } from "@components/redux/apis/auth";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {

  const {data}=useRefreshTokenQuery()
  
  const url = import.meta.env.VITE_DEST_URL;

  return (
    <>
      <ReplyPopUp />
      <DrawerAppBar />
      {children}
    </>
  );
};

export default ContextWrapper;
