import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  inputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  loginAction = () => {
    const { email, password } = this.state;
    const { setLoginDetails, history } = this.props;
    axios({
      method: "POST",
      url: "/api/tokens",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ email, password })
    })
      .then(function(res) {
        if (res.data) {
          const token = res.data.id;
          setLoginDetails(email, token, () => history.push("/menu"));
        }
      })
      .catch(
        function(err) {
          if (err.response) {
            this.setState({ error: err.response.data.error });
          }
        }.bind(this)
      );
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <h1>Hungry???</h1>
        <h3>Let's login and start ordering...</h3>
        {error ? <p>{error}</p> : <p>&nbsp;</p>}
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={this.inputChange}
        />
        <br />

        <input
          name="password"
          // type="password"
          placeholder="password"
          onChange={this.inputChange}
        />
        <br />
        <button
          disabled={!email || !password ? "disabled" : ""}
          onClick={this.loginAction}
        >
          Login
        </button>
      </div>
    );
  }
}

export default withRouter(Login);
