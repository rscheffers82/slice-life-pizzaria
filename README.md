## JSON API for Slice Life Pizzaria, a pizza delivery company

NodeJS server for taking care of Slice Life Pizzaria's deliveries.<br>
The following routes are available:

| Route | Description |
| --- | --- |
|`api/users` | CRUD operations to manage users
|`api/tokens` | CRUD operations to manage tokens
|`/api/menu` | GET route to view the menu
|`/api/cart` | View or empty cart and add or remove a menu item
|`/api/order` | POST route to create an order, process payment through Stripe and email a confirmation

When no route is found a `404` status will be returned.


## How to get the server up and running? 🚀

1. Clone or download this project
2. Rename `example.config.js` to `config.js`
3. Register for [Stripe](https://stripe.com) and [Mailgun](https://www.mailgun.com) and populate their API keys and details into the config file.
4. Run `node index.js` to start the server


## Awesome, let's order pizza 🍕🍕🍕

1. Create a user `POST /api/users`
2. Log in by creating a token `POST /api/tokens`
3. Request for the menu `GET /api/menu?email=<email>`
4. Add one or several item(s) to the cart `POST /api/cart`
5. Review items in the cart `GET /api/cart?email=<email>`
5. Create an order `POST /api/order`


## API Details 📘

For exact API details import [Slice Life Pizzaria](https://raw.githubusercontent.com/rscheffers82/slice-life-pizzaria/master/public/Slice-Life-Pizzaria.postman_collection.json) into Postman and follow the steps in the above paragraph.


## Email confirmation 📧

After a successfull transaction an order confirmation is sent to the user's email address, which looks like the below.

![Order Confirmation email](https://raw.githubusercontent.com/rscheffers82/slice-life-pizzaria/master/public/email-example.jpg)

**NOTE:** _When using Mailgun in Sandbox mode, only authorized recipients receive an email. If this is the case, make sure the email address in the to: field is authorized._


## Debugging 🐜

When debugging of the server is required use the following syntax when starting the server for additional information.

iOS: `NODE_DEBUG=[option] node index.js` \*<br>
Windows: `set NODE_DEBUG=[option]&&node index.js` \*

The following options are available:
- server

\* replace `[option]` with one of the above.