import React, { useContext, useEffect, useState } from "react";
import { MyButtonComponent } from "../MaterialUiDesign/MyButton";
import { MyTextInput } from "../MaterialUiDesign/MyFormFields";
import { MyCenterDiv } from "../MaterialUiDesign/CentralDiv";
import { validateSignupForm } from "../layout/formValidation";
import axios from "axios";
import { AppStateContext } from "../appState/appState.context";
import MyAlert from "../MaterialUiDesign/MyAlert";

const Signup = (props) => {
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;

  const { error } = appState;

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });

  const {
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    email,
    emailError,
    password,
    passwordError,
  } = userDetails;

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

    const validationError = validateSignupForm(userDetails, setUserDetails);

    /** If No error found then Do our task and reset the form (state)  */
    if (!validationError) {
      /** Calling signup  */

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await axios.post("/auth/register", userDetails, config);
        console.log(res.data);

        dispatch({ type: "REGISTER_SUCCESS", value: res.data });

        props.history.push("/");
      } catch (err) {
        dispatch({ type: "REGISTER_FAIL", value: err.response.data.msg });
      }

      // clear from after  calling
      setUserDetails({
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
      });
    }
  };

  return (
    <div>
      {error && <MyAlert type="error">{error}</MyAlert>}

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
            <h2 style={{ textAlign: "center", marginTop: "-20px" }}>SIGN UP</h2>
          </div>
          <div>
            <MyTextInput
              type="text"
              id="firstName"
              name="firstName"
              label="First Name"
              value={firstName}
              onChange={onChange}
              error={firstNameError !== ""} // Need to enable error if any error exist
              helperText={firstNameError} // This is the error text which will be shown to user
              onFocus={onFocus}
            />
          </div>
          <div>
            <MyTextInput
              type="text"
              id="lastName"
              name="lastName"
              label="Last Name"
              value={lastName}
              onChange={onChange}
              error={lastNameError !== ""}
              helperText={lastNameError}
              onFocus={onFocus}
            />
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

          <div style={{ textAlign: "center" }}>
            <MyButtonComponent
              color="primary"
              variant="contained"
              type="submit">
              Signup
            </MyButtonComponent>
          </div>
        </form>
      </MyCenterDiv>
    </div>
  );
};

export default Signup;
