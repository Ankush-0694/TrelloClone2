/**
 * Validate Signup Form Fields
 */
const validateSignupForm = (userDetails, setUserDetails) => {
  const { firstName, lastName, email, password } = userDetails;

  let isError = false;

  // we spread it in userDetails after setting the error (this prevent us to do setUserDetails for every error)
  const errors = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  };

  if (email.indexOf("@") === -1) {
    isError = true;
    errors.emailError = "Enter a valid email address";
  }

  if (firstName === "") {
    isError = true;
    errors.firstNameError = "First Name is required";
  }

  if (lastName === "") {
    isError = true;
    errors.lastNameError = "Last Name is required";
  }

  if (password.length < 6) {
    isError = true;
    errors.passwordError = "Password should have atleast 6 characters";
  }

  setUserDetails({
    ...userDetails,
    ...errors,
  });

  return isError;
};

const validateLoginForm = (userDetails, setUserDetails) => {
  const { email, password } = userDetails;

  let isError = false;

  const errors = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  };

  if (email.indexOf("@") === -1) {
    isError = true;
    errors.emailError = "Enter a valid email address";
  }

  if (password.length < 6) {
    isError = true;
    errors.passwordError = "Password should have atleast 6 characters";
  }

  setUserDetails({
    ...userDetails,
    ...errors,
  });

  return isError;
};

export { validateSignupForm, validateLoginForm };
