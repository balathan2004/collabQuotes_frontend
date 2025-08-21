import React, { FC, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "@styles/login.module.css";
import LoginFetch from "@components/utils/loginFetch";
import { useNavigate } from "react-router-dom";
import { useReplyContext } from "@components/context/reply_context";
import { useLoadingContext } from "@components/context/loading_context";
interface UserProps {
  email: string;
  password: string;
}

const url = import.meta.env.VITE_DEST_URL;
const Login = () => {
  const [userData, setUserData] = useState<UserProps>({
    email: "",
    password: "",
  });


  const { setReply } = useReplyContext();
  const { isLoading, setIsLoading } = useLoadingContext();

  const router = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name && value) {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.email && userData.password) {
      setIsLoading(true);
      const response = await LoginFetch({
        route: `${url}/auth/login`,
        data: userData,
      });
      console.log({response});
      if (response) {
        setIsLoading(false);
        if (response.status == 200) {
          router("/blog");
        }
        setReply(response.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <p>Login to Collab Quotes</p>
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
        <Link to="/auth/reset-password">Forget Password?</Link>
        <Link to="/auth/register">No Account , Register here</Link>
        <Button type="submit" variant="outlined" disabled={isLoading}>
          {isLoading ? "Logging in" : "Log in"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
