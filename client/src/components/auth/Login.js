import React, { useContext, useEffect, useState } from "react";
import { MyCenterDiv } from "../MaterialUiDesign/CentralDiv";
import { MyButtonComponent } from "../MaterialUiDesign/MyButton";
import { MyTextInput } from "../MaterialUiDesign/MyFormFields";
import { validateLoginForm } from "../layout/formValidation";
import { AppStateContext } from "../appState/appState.context";
import axios from "axios";
import MyAlert from "../MaterialUiDesign/MyAlert";

const Login = (props) => {
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;

  // const { loading } = appState;

  const [userDetails, setUserDetails] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  const { email, emailError, password, passwordError } = userDetails;

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  /** this function is added to remove that input error when user
   * focus on that input
   */
  const onFocus = (e) => {
    let targetError = e.target.name + "Error";
    setUserDetails({ ...userDetails, [targetError]: "" });
  };

  useEffect(() => {
    return () => {};
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateLoginForm(userDetails, setUserDetails);

    /** If No error found then Do our task and reset the form (state)  */
    if (!validationError) {
      /*  Do any task */

      try {
        const res = await axios.post(
          "http://localhost:5001/auth/login",
          userDetails
        );
        console.log(res.data);

        dispatch({ type: "LOGIN_SUCCESS", value: res.data });

        props.history.push("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAIL", value: err.response.data.msg });
      }

      setUserDetails({
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
      });
    }
  };

  return (
    <div>
      {props.location.state && (
        <MyAlert type="error">{props.location.state}</MyAlert>
      )}
      {window.history.replaceState({}, document.title)}

      <MyCenterDiv display="flex" width="100%" height="100vh">
        <form
          onSubmit={onSubmit}
          style={{
            width: "50%",
            height: "50vh",
            margin: "auto",
            maxWidth: "550px",
          }}>
          <div style={{ color: "black", width: "100%" }}>
            <h2 style={{ textAlign: "center", marginTop: "-20px" }}>LOGIN</h2>
          </div>
          <div>
            <MyTextInput
              type="text"
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={onChange}
              error={emailError !== ""}
              helperText={emailError}
              onFocus={onFocus}
            />
          </div>
          <div>
            <MyTextInput
              type="password"
              id="password"
              name="password"
              label="Password"
              value={password}
              onChange={onChange}
              error={passwordError !== ""}
              helperText={passwordError}
              onFocus={onFocus}
            />
          </div>

          <br></br>

          <div className="container-log-btn" style={{ textAlign: "center" }}>
            <MyButtonComponent
              color="primary"
              variant="contained"
              type="submit">
              Login
            </MyButtonComponent>
          </div>
        </form>
      </MyCenterDiv>
    </div>
  );
};

export default Login;
