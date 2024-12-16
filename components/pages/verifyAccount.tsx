import React, { useEffect, useState } from "react";
import styles from "@styles/profile.module.css";
import { Button } from "@mui/material";
import { ResponseConfig } from "../interfaces";
import { Link } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
const AccountVerification = () => {
  const url = import.meta.env.VITE_DEST_URL;
  const [params] = useSearchParams();

  const userEmail = params.get("email");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${url}/auth/verify_account/${userEmail}`, {
        method: "GET",
        credentials: "include",
      });
      const res = (await response.json()) as ResponseConfig;
      if (res && res.status == 200) {
        setIsSuccess(true);
      }
    }
    fetchData();
  }, [userEmail]);

  return (
    <div className="main_container">
      <div className={styles.container}>
        {userEmail}
        {isSuccess ? (
          <>
            <span>`${userEmail} your email is verified for collab quotes`</span>
            <Button><Link to="/auth/login">Login Here</Link></Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AccountVerification;
