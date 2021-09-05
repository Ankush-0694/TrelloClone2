import React, { useEffect, useRef, useState } from "react";
import { Slide, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});

function Transition(props) {
  return <Slide {...props} direction="down" />;
}

/** FOR OPEN AND CLOSE THE ALERT MESSAGE */

const MyAlert = ({ children, type, ...otherProps }) => {
  const [open, setOpen] = useState(true);

  /** used to remove error but that was due to fade transition */
  const alertref = useRef(null);

  /** This prop passed from various page to make false the submit event
   * By which we can generate alert again and again
   *
   * So We need to clear these state so that we can again show the alert
   */
  const { stateToClear } = otherProps;

  const handleClose = (event, reason) => {
    /**don't close when user click other than close alert button
     * this line is important because if user do any state change at the same
     * time alert is unmounted , Error will be occurred
     */
    if (reason === "clickaway") {
      return;
    }

    /** need to clear this after alert is closed */
    if (stateToClear) stateToClear(false);

    /** We need to clear the global error from reactive variable
     * after alert get closed
     * we it is the same var we are using everywhere
     */

    setOpen(false);
  };

  /** because we are setting the state when unmount this is why we need to cleanup */
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Snackbar
        style={{ marginTop: "48px" }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Transition}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert ref={alertref} onClose={handleClose} severity={type}>
          {children}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MyAlert;
