import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Register from "./components/Register";

import "./styles/index.css";

axios.defaults.baseURL = "http://localhost:2000";

class App extends Component {
  state = {
    // userDetails: { email: null, token: null },
    userDetails: {
      email: "b@diamond.com",
      token: "IcoEvLSXq8J3Sn1OqYCSg1"
    },
    cart: []
  };

  componentDidMount() {
    // check for token in localStorage, yes -> menu, no -> login
  }

  setLoginDetails = (email, token, afterUpdate) => {
    this.setState({ userDetails: { email, token } }, () => afterUpdate());
  };

  render() {
    const { userDetails } = this.state;
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <PrivateRoute
              path="/menu"
              component={Menu}
              userDetails={userDetails}
            />
            <Route
              path="/register"
              render={() => <Register setLoginDetails={this.setLoginDetails} />}
            />
            <Route
              path="/login"
              render={() => <Login setLoginDetails={this.setLoginDetails} />}
            />
            <Redirect to="/login" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
