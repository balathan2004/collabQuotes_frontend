import React, { FC, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "@styles/login.module.css";
import LoginFetch from "@components/utils/loginFetch";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "@components/context/loading_context";
import { CustomToast } from "@components/elements/CustomAlert";
import { useLoginMutation } from "@components/redux/apis/auth";
interface UserProps {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setUserData] = useState<UserProps>({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const router = useNavigate();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name && value) {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userData.email || !userData.password) {
      CustomToast({ type: "error", message: "Fields missing" });
      return;
    }

    login(userData)
      .unwrap()
      .then((res) => {
        CustomToast({ type: "success", message: res.message });
        router("/blog");
      })
      .catch((err) => {
        return CustomToast({ type: "error", message: err.message });
      });
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
        {isLoading &&  <CircularProgress className="loader" /> }
        <Button type="submit" variant="outlined" disabled={isLoading}>
          {isLoading ? "Logging in" : "Log in"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
