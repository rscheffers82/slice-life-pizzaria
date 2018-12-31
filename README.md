## JSON API for Slice Life Pizzaria, a pizza delivery company

NodeJS server for Pizza Delivery Company that has the following routes available:

| Route | Description |
| --- | --- |
|`/users` | CRUD operations to manage users
|`/tokens` | CRUD operations to manage tokens
|`/api/cart` | view or empty cart and add or remove an item
|`/api/order` | POST route to create an order, process payment through Stripe and email a confirmation
|`/api/menu` | GET route to view the menu

When no route is found a `404` status will be returned.

To run the project, clone this repo and run:

`node index.js`

<!-- To run the server locally in production mode use:

iOS: `NODE_ENV=production node index.js`<br>
Windows: `set NODE_ENV=production&& node index.js`

## Create an SSL certificate for production

In order to personalise the https server, create a new certificate in the https folder with the following files `cert.pem` and `key.pem`. Instructions can be found [here](https://github.com/rscheffers82/RESTful-api/tree/master/https).
-->

## Email confirmation

After a successfull transaction an order confirmation is sent to the user's email address. Here's an example.

![Order Confirmation email](https://raw.githubusercontent.com/rscheffers82/slice-life-pizzaria/master/public/email-example.jpg)


## Debugging

When debugging the server is required use the following syntax for additional information.

iOS: `NODE_DEBUG=[option] node index.js` \*<br>
Windows: `set NODE_DEBUG=[option]&&node index.js` \*

The following options are available:
- server

\* replace `[option]` with one of the above.