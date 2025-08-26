import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "@styles/tweet.module.css";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "@components/context/loading_context";
import { useCreatePostMutation } from "@components/redux/apis/postApi";
import { useAuth } from "@components/redux/apis/authSlice";
import { CustomToast } from "@components/elements/CustomAlert";

const Tweet: FC = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const router = useNavigate();

  const { data: userData } = useAuth();

  const [createPost, { isLoading }] = useCreatePostMutation();

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

    if (!quote.trim()) return;

    createPost({
      username: userData.username,
      author: author ? author : "unknown",
      quote,
    })
      .unwrap()
      .then((res) => {
        CustomToast({ type: "success", message: res.message });
        console.log(res);
        router("/blog");
      })
      .catch((err) => {
        CustomToast({ type: "error", message: err.message || "Error Caught" });

        console.log(err);
      });
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
          <Button type="submit" variant="outlined" disabled={isLoading}>
            {isLoading ? "Submitting" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Tweet;
