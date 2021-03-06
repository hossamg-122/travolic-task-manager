import React from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));
// this a notification componet to informe the user after deleting, creating and editing the task and W it's controled from redux 
const Notification =() => {
  const notify = useSelector(({ taskManager }) => taskManager.notify);
  const dispatcher = useDispatch();

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatcher({
      type: "notify",
      payload: {
        ...notify,
        isOpen: false,
      },
    });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
export default Notification