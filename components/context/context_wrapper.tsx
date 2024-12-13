import { FC, ReactNode, useEffect } from "react";
import { useUserContext } from "./user_context";
import { AuthResponseConfig } from "@components/interfaces";
import { useNavbarContext, NavUsers } from "./navbar_context";
import ReplyPopUp from "@components/elements/ReplyPopUp";
import DrawerAppBar from "@components/elements/navbar";
const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { setDirs } = useNavbarContext();
  const { setUserCred } = useUserContext();
  const url = import.meta.env.VITE_DEST_URL;

  useEffect(() => {
    async function getCred() {
      console.log("started");
      const response = await fetch(`${url}/auth/login_cred`, {
        method: "GET",
        credentials: "include",
      });

      const res = (await response.json()) as AuthResponseConfig;
      console.log(res);
      if (res && res.status == 200) {
        console.log("setting");
        setDirs(NavUsers);
        console.log("setted nav");
        setUserCred(res.credentials);
      }
    }
    getCred();
  }, []);

  return (
    <>
      <ReplyPopUp />
      <DrawerAppBar  />
      {children}
    </>
  );
};

export default ContextWrapper;
