import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    address: null,
    error: null
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(() => ({ [name]: value }));
  };

  handleRegister = () => {
    const { name, email, password, address } = this.state;
    const { setLoginDetails, history } = this.props;
    axios({
      method: "POST",
      url: "/api/users",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ name, email, password, address })
    })
      .then(function(res) {
        if (res.status === 200) {
          return axios({
            method: "POST",
            url: "/api/tokens",
            headers: {
              "Content-Type": "application/json"
            },
            data: JSON.stringify({ email, password })
          });
        }
      })
      .then(function(res) {
        if (res.data) {
          const token = res.data.id;
          setLoginDetails(email, token, () => history.push("/menu"));
        }
      })
      .catch(
        function(err) {
          if (err.response && err.response.data) {
            this.setState({ error: err.response.data.error });
          }
        }.bind(this)
      );
  };

  render() {
    const { name, email, password, address, error } = this.state;
    return (
      <div>
        {error ? <p>{error}</p> : <p>&nbsp;</p>}
        <input
          name="name"
          value={name || ""}
          type=""
          placeholder="Your name"
          onChange={this.handleChange}
        />
        <input
          name="email"
          value={email || ""}
          type=""
          placeholder="email address"
          onChange={this.handleChange}
        />
        <input
          name="password"
          value={password || ""}
          type=""
          placeholder="password"
          onChange={this.handleChange}
        />
        <input
          name="address"
          value={address || ""}
          type=""
          placeholder="your address"
          onChange={this.handleChange}
        />
        <button onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}

export default withRouter(Register);
