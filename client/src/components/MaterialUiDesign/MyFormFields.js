import { TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

// we will override these styles using other classes instead of this in our component, (this is for example)

// https://stackblitz.com/edit/material-ui-custom-outline-color?file=ValidField.js - this is the all thing which i need

const useStyles = makeStyles({
  root: {
    margin: "10px 0px",

    "& .MuiInputBase-input": {
      backgroundColor: "white",
    },
  },

  MultiLineRoot: {
    "& .MuiInputBase-root": {
      backgroundColor: "white",
    },
  },
});

const MyTextInput = ({ style, onChange, ...others }) => {
  const classes = useStyles();
  return (
    <TextField
      {...others}
      onChange={onChange}
      style={style}
      variant="outlined"
      fullWidth
      className={classes.root}
      size="medium"
    />
  );
};

const MyMultilineInput = ({
  id,
  label,
  rows,
  variant,
  type,
  name,
  value,
  onChange,
  autoFocus,
}) => {
  const classes = useStyles();
  return (
    <TextField
      autoFocus={autoFocus}
      id={id}
      type={type}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      multiline
      rows={rows}
      variant={variant}
      className={classes.MultiLineRoot}
    />
  );
};

export { MyTextInput, MyMultilineInput };
