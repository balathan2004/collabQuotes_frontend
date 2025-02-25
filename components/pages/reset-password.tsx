import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "@styles/login.module.css";
import { Link } from "react-router-dom";
import SendData from "@components/utils/sendData";
import { useLoadingContext } from "@components/context/loading_context";
import { useReplyContext } from "@components/context/reply_context";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const url = import.meta.env.VITE_DEST_URL;
  const router = useNavigate();
  const { setReply } = useReplyContext();
  const { isLoading,setIsLoading } = useLoadingContext();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email) {
      setIsLoading(true);
      const response = await SendData({
        route: `${url}/auth/reset-password`,
        data: { email },
      });

      if (response) {
        setIsLoading(false);
        setReply(response.message);
        if (response.status == 200) {
          router("/auth/login");
        }
      } else {
        setReply("error caught");
      }
    }
  };

  return (
    <div className={styles.container}>
      <p>Reset Password</p>
      <form onSubmit={submitForm}>
        <TextField
          onChange={(event) => setEmail(event.target.value)}
          name="email"
          className={styles.input}
          id="outlined-basic"
          label="Your Email"
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

export default ResetPassword;
