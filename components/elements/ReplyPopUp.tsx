import React, { FC, useEffect } from "react";
import { useReplyContext } from "../context/reply_context";
import Snackbar from "@mui/material/Snackbar";

const ReplyPopUp: FC = () => {
  const { reply, setReply } = useReplyContext();

  const handleClose = () => {
    console.log("closed")
    setReply(false); // Reset the reply message
  }; // Add dependencies

  return (
    <Snackbar
      open={!!reply}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000}
      message={reply}
      onClose={handleClose}
    />
  );
};

export default ReplyPopUp;
