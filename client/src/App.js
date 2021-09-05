import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import { AppStateContextProvider } from "./components/appState/appState.context";
import HomePage from "./components/pages/homepage/homepage";
import { Toolbar } from "@material-ui/core";
import PrivateRoute from "./components/routing/PrivateRoutes";

function App() {
  return (
    <AppStateContextProvider>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Toolbar />
          <div className="App">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/" component={HomePage} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    </AppStateContextProvider>
  );
}

export default App;
