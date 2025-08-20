import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "@styles/login.module.css";
import { Link } from "react-router-dom";
// import SendData from "@components/utils/sendData";
import { useLoadingContext } from "@components/context/loading_context";
import { useReplyContext } from "@components/context/reply_context";
import { useNavigate } from "react-router-dom";
interface UserProps {
  email: string;
  password: string;
}

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmpass] = useState("");
  const [email, setEmail] = useState("");
  const router = useNavigate();

  const [accessToken, setAccessToken] = useState("");
  const url = import.meta.env.VITE_DEST_URL;

  const { setReply } = useReplyContext();
  const { isLoading, setIsLoading } = useLoadingContext();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessToken && password && confirmPass == password) {
      setIsLoading(true);
      // const response = await SendData({
      //   route: `${url}/auth/change-password`,
      //   data: { accessToken, password },
      // });

      // if (response) {
      //   setIsLoading(false);
      //   setReply(response.message);
      //   if (response.status == 200) {
      //     router("/auth/login");
      //   }
      // } else {
      //   setReply("error caught");
      // }
    } else {
      console.log(accessToken, password, confirmPass);
      console.log("field missing");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");

    // Parse fragment (hash)
    const hashParams = new URLSearchParams(
      window.location.hash.replace("#", "")
    );
    const accessTkn = hashParams.get("access_token");
    console.log(accessTkn, email);

    if (!accessTkn || !email) {
      setReply("Invalid or missing access token.");
    } else {
      setAccessToken(accessTkn);
      setEmail(email);
    }
  }, []);

  return (
    <div className={styles.container}>
      <p>Reset Password</p>
      <p>for {email}</p>
      <form onSubmit={submitForm}>
        <TextField
          onChange={(event) => setPassword(event.target.value)}
          name="password"
          className={styles.input}
          id="outlined-basic"
          label="New Password"
          variant="outlined"
          required
        />
        <TextField
          onChange={(event) => setConfirmpass(event.target.value)}
          name="confirm-password"
          className={styles.input}
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          required
        />

        <Link to="/auth/login">Login here</Link>
        <Button type="submit" variant="outlined" disabled={isLoading}>
          {isLoading ? "Submitting" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
