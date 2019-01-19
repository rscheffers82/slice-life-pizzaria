import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Menu from "./components/Menu";

import "./App.css";

axios.defaults.baseURL = "http://localhost:2000";

class App extends Component {
  state = {
    userDetails: { email: null, token: null },
    cart: []
  };

  setLoginDetails = (email, token, afterUpdate) => {
    this.setState({ userDetails: { email, token } }, () => afterUpdate());
  };

  render() {
    const { userDetails } = this.state;
    return (
      <Router>
        <Switch>
          <PrivateRoute
            path="/menu"
            component={Menu}
            userDetails={userDetails}
          />
          <Route
            path="/login"
            render={() => <Login setLoginDetails={this.setLoginDetails} />}
          />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
