import React from "react";

import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
// this to import the styles from styles file
import makeStyles from "./style";

import TaskManager from "../pages/TaskManager/TaskManager";
// this theme to control the colors from one place
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2BA6DE",
      light: "#d6de29",
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

const App =() => {
  const classes = makeStyles();

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
