import React, { FC, useState } from "react";
import { TextField, Button, Link } from "@mui/material";
import styles from "@styles/login.module.css";
import SendData from "@components/utils/sendData";

import { useReplyContext } from "@components/context/reply_context";
import LoginFetch from "@components/utils/loginFetch";
interface UserProps {
  email: string;
  password: string;
}

const SignUp = () => {
  const [userData, setUserData] = useState<UserProps>({
    email: "",
    password: "",
  });
  const url = import.meta.env.VITE_DEST_URL;

  const { setReply } = useReplyContext();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name && value) {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.email && userData.password) {
      const response = await SendData({
        route: `${url}/auth/register`,
        data: userData,
      });

      if (response) {
        if (response.status == 200) {
          setReply("verification code sent to email");
        } else {
          setReply(response.message);
        }
      } else {
        setReply("error caught");
      }
    }
  };

  return (
    <div className={styles.container}>
      <p>SignUp to Collab Quotes</p>
      <form onSubmit={submitForm}>
        <TextField
          onChange={handleInput}
          name="email"
          className={styles.input}
          id="outlined-basic"
          label="Your Email"
          variant="outlined"
          required
        />
        <TextField
          onChange={handleInput}
          name="password"
          className={styles.input}
          id="outlined-basic"
          label="Your Password"
          variant="outlined"
          required
        />
        <Link href="#">Forget Password ???</Link>
        <Button type="submit" variant="outlined">
          SignUp
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
