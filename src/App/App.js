import React from "react";
import "./App.css";

import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";



import TaskManager from "../pages/TaskManager/TaskManager";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d6de29",
      light: "#2BA6DE",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    margin: "0 auto",
    width: "80%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
    

        <TaskManager />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
