import React, { Component } from "react";
import axios from "axios";
import { Z_BLOCK } from "zlib";

const getMenu = (email, token) => {
  return axios({
    method: "GET",
    url: "/api/menu",
    headers: {
      "Content-Type": "application/json",
      token: token
    },
    params: {
      email
    }
  });
  // TODO: Check error handling now async await is used.
  // .then(function(res) {
  //   debugger;
  //   // if (res.data) {
  //   //   const token = res.data.id;
  //   // }
  // })
  // .catch(function(err) {
  //   debugger;
  //   if (err.response) {
  //     // this.setState({ error: err.response.data.error });
  //   }
  // });
};

class DisplayMenu extends Component {
  state = {
    menuItems: {}
  };

  async componentDidMount() {
    const {
      userDetails: { email, token }
    } = this.props;

    const response = await getMenu(email, token);
    const keys = Object.keys(response.data);
    keys.forEach(key => {
      response.data[key] = {
        ...response.data[key],
        amount: 0,
        size: 12
      };
    });
    this.setState({ menuItems: response.data });
  }

  addToCart = (id, size, amount) => {
    const {
      userDetails: { email, token }
    } = this.props;
    return axios({
      method: "POST",
      url: "/api/cart",
      headers: {
        "Content-Type": "application/json",
        token
      },
      data: {
        email,
        id,
        size,
        amount
      }
    })
      .then()
      .catch();
  };

  renderMenu = () => {
    const { menuItems } = this.state;
    const sizes = {
      10: "Small",
      12: "Medium",
      14: "Large",
      16: "Family",
      18: "Party"
    };

    const htmlMenu = [];

    for (let item in menuItems) {
      const { id, name, description, size, price, amount, url } = menuItems[
        item
      ];

      const htmlItem = (
        <div class="row" key={Math.random()}>
          <div class="col s12 m6">
            <div class="card blue-grey darken-1">
              <div class="card-image">
                <img src={"menu-items/" + url} />
                <span class="card-title">{name}</span>
              </div>

              <div class="card-content white-text">
                <p>{description}</p>
                Size:
                <select class="item-size" value={size}>
                  {Object.keys(sizes).map(key => (
                    <option key={key} value={key}>
                      {sizes[key]}
                    </option>
                  ))}
                </select>
                Amount:
                <div class="item-amount-wrapper">
                  <i class="material-icons item-amount-add-remove">
                    remove_circle_outline
                  </i>
                  <div class="item-amount">{amount}</div>
                  <i class="material-icons item-amount-add-remove">
                    add_circle_outline
                  </i>
                </div>
              </div>
              <div class="card-action">
                <a
                  class="waves-effect waves-light btn"
                  onClick={this.addToCart.bind(id, "10", 1)}
                >
                  <i class="material-icons left">add_shopping_cart</i>Add
                </a>
              </div>
            </div>
          </div>
        </div>
      );

      htmlMenu.push(htmlItem);
    }
    return htmlMenu;
  };

  render() {
    return (
      <div>
        <p>Menu</p>
        <div class="menu-wrapper">{this.renderMenu()}</div>
      </div>
    );
  }
}

export default DisplayMenu;
