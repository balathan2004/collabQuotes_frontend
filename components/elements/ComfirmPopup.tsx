import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  isVisible: boolean;
  title?: string;
  message: string;
  btnFunc1: () => void;
  btnFunc2: () => void;
  btnLabel1?:string
   btnLabel2?:string
};

export default function AlertDialog(props: Props) {
  return (
    <React.Fragment>
      <Dialog
        open={props.isVisible}
        onClose={() => props.btnFunc1()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.btnFunc1()}>{props.btnLabel1||"Cancel"}</Button>
          <Button onClick={() => props.btnFunc2()} autoFocus>
            {props.btnLabel2||"Okay"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
