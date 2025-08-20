import { FC, ReactNode, useEffect } from "react";
import { useUserContext } from "./user_context";
import { AuthResponseConfig } from "@components/interfaces";
import { useNavbarContext, NavUsers } from "./navbar_context";
import ReplyPopUp from "@components/elements/ReplyPopUp";
import DrawerAppBar from "@components/elements/navbar";
import { useRefreshTokenQuery } from "@components/redux/apis/auth";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  // const { setDirs } = useNavbarContext();
  // const { setUserCred } = useUserContext();
  const {data}=useRefreshTokenQuery()
  
  const url = import.meta.env.VITE_DEST_URL;

  useEffect(() => {
    console.log("data",data)
  }, [data]);



  return (
    <>
      <ReplyPopUp />
      <DrawerAppBar />
      {children}
    </>
  );
};

export default ContextWrapper;
