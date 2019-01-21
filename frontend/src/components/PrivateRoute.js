import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, userDetails, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // userDetails.email && userDetails.token ? (
      true ? (
        <Component {...props} userDetails={userDetails} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
