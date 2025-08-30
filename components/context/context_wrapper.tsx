import { FC, ReactNode, useEffect, useState } from "react";
import DrawerAppBar from "@components/elements/navbar";
import { useRefreshTokenQuery } from "@components/redux/apis/auth";
import  { Toaster } from 'react-hot-toast';

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {


  const [token,setToken]=useState<string|null>(null)

  const {data}=useRefreshTokenQuery(token as string,{skip:!token})

  console.log({data});
  

    useEffect(() => {
    const savedToken = localStorage.getItem("collabQuotes_refreshToken");
    setToken(savedToken);
  }, []);

  return (
    <>
      <DrawerAppBar />
      {children}
      <Toaster/>
    </>
  );
};

export default ContextWrapper;
