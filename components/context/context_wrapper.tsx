import { FC, ReactNode, useEffect } from "react";
import DrawerAppBar from "@components/elements/navbar";
import { useRefreshTokenQuery } from "@components/redux/apis/auth";
import  { Toaster } from 'react-hot-toast';

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {

  const {data}=useRefreshTokenQuery()
  


  return (
    <>
      <DrawerAppBar />
      {children}
      <Toaster/>
    </>
  );
};

export default ContextWrapper;
