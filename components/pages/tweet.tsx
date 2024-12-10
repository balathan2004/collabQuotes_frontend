import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "@styles/tweet_blog.module.css";
import SendData from "@components/utils/sendData";
const url = import.meta.env.VITE_DEST_URL;
const Tweet: FC = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

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

    if (quote) {
      const data = { quote: quote, author: author ? author : "unknown" };
      const response = await SendData({
        route: `${url}/posts/create_tweet`,
        data: data,
      });
      if (response) {
        setMessage(response.message);
      } else {
        setMessage("Error Caught");
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Share Your Quote</h1>
          <p>{message}</p>
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
