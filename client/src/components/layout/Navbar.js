import React, { useContext, useEffect } from "react";
import { MyButtonComponent } from "../MaterialUiDesign/MyButton";
import { withRouter } from "react-router";
import { MyNavbar } from "../MaterialUiDesign/MyNavbar";
import { MyTypography } from "../MaterialUiDesign/MyTypography";
import { makeStyles } from "@material-ui/core/styles";
import { AppStateContext } from "../appState/appState.context";
import axios from "axios";
import setAuthToken from "../../util/setAuthToken";

const NavbarStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    width: "90%",
    margin: "0px auto",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBtn: {
    "&:focus": {
      border: "none",
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
}));

const Navbar = ({ history }) => {
  const classes = NavbarStyles();

  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;

  const {
    auth: { isAuthenticated },
    loading,
  } = appState;

  useEffect(() => {
    async function loadUser() {
      console.log("hello");
      setAuthToken(localStorage.getItem("Trello"));

      try {
        const res = await axios.get("/auth/loadUser");

        console.log(res.data);

        dispatch({ type: "LOAD_USER", value: res.data });
      } catch (err) {
        dispatch({ type: "AUTH_ERROR", value: err.response.data.msg });
      }
    }
    loadUser();
  }, [isAuthenticated]);

  const onLogout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/login");
  };

  return (
    <MyNavbar>
      <div className={classes.navbar}>
        <MyButtonComponent
          className={classes.navBtn}
          onClick={() => {
            history.push("/");
          }}
          color="inherit">
          <MyTypography variant="h6" noWrap>
            Home
          </MyTypography>
        </MyButtonComponent>
        {!isAuthenticated ? (
          <div>
            {/* Login */}
            <MyButtonComponent
              className={classes.navBtn}
              onClick={() => {
                history.push("login");
              }}
              color="inherit">
              <MyTypography variant="h6" noWrap>
                Login
              </MyTypography>
            </MyButtonComponent>

            {/* SIGNUP */}

            <MyButtonComponent
              className={classes.navBtn}
              onClick={() => {
                history.push("/signup");
              }}
              color="inherit">
              <MyTypography variant="h6" noWrap>
                Signup
              </MyTypography>
            </MyButtonComponent>
          </div>
        ) : (
          <MyButtonComponent
            className={classes.navBtn}
            onClick={onLogout}
            color="inherit">
            <MyTypography variant="h6" noWrap>
              Logout
            </MyTypography>
          </MyButtonComponent>
        )}
      </div>
    </MyNavbar>
  );
};

export default withRouter(Navbar);
