import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  /** Adding this to make admin navbar top of menu toolbar */
  navbar: {
    zIndex: "20000",
  },
}));

export function MyNavbar({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar>{children}</Toolbar>
      </AppBar>
    </div>
  );
}
