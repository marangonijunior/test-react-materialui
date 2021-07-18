import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Booking from "../pages/Booking";

const RouterProvider = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/bookig" />
        <Route exact path="/bookig" component={Booking} />
      </Switch>
    </Router>
  );
};

export default RouterProvider;
