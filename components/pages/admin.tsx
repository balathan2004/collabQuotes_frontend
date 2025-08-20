import React, { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "@styles/tweet.module.css";

const url = import.meta.env.VITE_DEST_URL;
import { useNavigate } from "react-router-dom";
import { ResponseConfig } from "@components/interfaces";
const AdminBlukTweet: FC = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const router = useNavigate();

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (apiKey && file) {
      const data = new FormData();

      data.append("file", file);
      data.append("apiKey", apiKey);
      console.log(data);
      const response = await fetch(`${url}/admin/create_bulk_tweet`, {
        method: "POST",
        body: data,
      }) ;
      const res=await response.json() as ResponseConfig
      if (res) {
        setMessage(res.message);
        router("/blog");
      } else {
        setMessage("Error Caught");
      }
    }
  };

  return (
    <div className="container">
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Hi Admin</h1>
          <input
            onChange={handleFile}
            name="file"
            type="file"
            accept=".json"
            required
          ></input>
          <TextField
            onChange={(event) => setApiKey(event.target.value)}
            fullWidth
            className={styles.input}
            name="apiKey"
            label="ApiKey for secure authentication"
            multiline
          />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminBlukTweet;
