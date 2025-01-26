import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "@styles/tweet.module.css";
import SendData from "@components/utils/sendData";
import { useUserContext } from "@components/context/user_context";
const url = import.meta.env.VITE_DEST_URL;
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "@components/context/loading_context";
import { useReplyContext } from "@components/context/reply_context";
const Tweet: FC = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const { setReply } = useReplyContext();
  const { userCred } = useUserContext();
  const router = useNavigate();
  const { setIsLoading } = useLoadingContext();

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name == "quote") {
      setQuote(value);
    } else {
      setAuthor(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (quote && userCred) {
      setIsLoading(true);
      const data = {
        quote: quote,
        author: author ? author : "unknown",
        username: userCred.username,
      };
      const response = await SendData({
        route: `${url}/posts/create_tweet`,
        data: data,
      });
      if (response) {
        console.log(response);
        setIsLoading(false);
        setReply(response.message);
        if (response.status == 200) {
          router("/blog");
        }
      } else {
        setReply("Error Caught");
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Share Your Quote</h1>

          <TextField
            onChange={handleInput}
            fullWidth
            className={styles.input}
            name="quote"
            label="Add Your Quote"
            multiline
          />
          <TextField
            onChange={handleInput}
            fullWidth
            className={styles.input}
            name="author"
            label="Mention Author Name"
          />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Tweet;
