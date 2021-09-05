import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppStateContext } from "../appState/appState.context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { stateAndDispatch } = useContext(AppStateContext);
  const [appState, dispatch] = stateAndDispatch;

  const {
    auth: { isAuthenticated },
    loading,
  } = appState;

  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect
            to={{
              pathname: "/login",
              state: "Please login",
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
