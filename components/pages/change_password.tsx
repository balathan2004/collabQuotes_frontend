import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "@styles/login.module.css";
import { Link } from "react-router-dom";
import SendData from "@components/utils/sendData";
import { useLoadingContext } from "@components/context/loading_context";
import { useReplyContext } from "@components/context/reply_context";
interface UserProps {
  email: string;
  password: string;
}

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmpass] = useState("");
  const [email,setEmail]=useState("")

  const [accessToken, setAccessToken] = useState("");
  const url = import.meta.env.VITE_DEST_URL;

  const { setReply } = useReplyContext();
  const { setIsLoading } = useLoadingContext();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessToken && password && confirmPass == password) {
      setIsLoading(true);
      const response = await SendData({
        route: `${url}/auth/change-password`,
        data: { accessToken, password },
      });

      if (response) {
        setIsLoading(false);
        setReply(response.message);
      } else {
        setReply("error caught");
      }
    } else {
      console.log(accessToken,password,confirmPass)
      console.log("field missing");
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const accessTkn = params.get("access_token");
    const email=params.get('email')

    if (!accessTkn || !email) {
      setReply("Invalid or missing access token.");
    } else {
      setAccessToken(accessTkn);
      setEmail(email)
    }
  }, []);

  return (
    <div className={styles.container}>
      <p>Reset Password</p>
      <p>for {email}</p>
      <form onSubmit={submitForm}>
        <TextField
          onChange={(event) => setPassword(event.target.value)}
          name="email"
          className={styles.input}
          id="outlined-basic"
          label="Your Email"
          variant="outlined"
          required
        />
        <TextField
          onChange={(event) => setConfirmpass(event.target.value)}
          name="email"
          className={styles.input}
          id="outlined-basic"
          label="Your Email"
          variant="outlined"
          required
        />

        <Link to="/auth/login">Login here</Link>
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
