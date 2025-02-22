import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "@styles/login.module.css";
import { Link } from "react-router-dom";
import SendData from "@components/utils/sendData";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "@components/context/loading_context";
import { useReplyContext } from "@components/context/reply_context";
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

  const router = useNavigate();

  const { setReply } = useReplyContext();
  const { isLoading, setIsLoading } = useLoadingContext();

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
      const response = await SendData({
        route: `${url}/auth/register`,
        data: userData,
      });

      if (response) {
        setIsLoading(false);
        if (response.status == 200) {
          setReply(response.message);
          router("/auth/login");
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

        <Link to="/auth/login">Login here</Link>
        <Button type="submit" variant="outlined" disabled={isLoading}>
          {isLoading ? "Registering" : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
