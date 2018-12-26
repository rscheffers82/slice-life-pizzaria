/*  
 *
 * Router and handlers for Pizza API
 * 
 */ 

// Dependencies
const helpers   = require('./helpers');
const config    = require('../config');
const _data     = require('./data');

// Define the handlers
const handlers = {};

/*
 *  JSON API Handlers
 *
 */
handlers.users = function(data, callback) {
    const acceptableMethods = ['post'];
    const { method } = data;
    // const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.includes(method)) {
        handlers._users[method](data, callback);
    } else {
        callback(405);
    }
}

// Container for the users sub methods
handlers._users = {};

// Create a new user
// Route            POST api/users
// Required data    name, email, password, address: {street, number, postalCode}
// Optional data    none
handlers._users.post = (data, callback) => {
    const { name, email, password, address } = data.payload;

    // Payload validation
    if (!name) { callback(400, {error: 'Request should include name in its request body'}); return; };
    if (typeof(name) !== 'string') { callback(400, {error: 'Request should include a valid name in its request body'}); return; };
    if (!email) { callback(400, {error: 'Request should include email in its request body'}); return; };
    if (!helpers.validateEmail(email)) { callback(400, {error: 'Provided email address is invalid'}); return; };
    if (!password) { callback(400, {error: 'Request should include password in its request body'}); return; };
    if (!helpers.validatePassword(password)) { callback(400, {error: 'Request should include a valid password (min. 5 characters long)'}); return; };
    if (typeof(address) !== 'object' || !address.streetAndNumber || !address.postalcode) { 
        callback(400, {error: 'The request should include and address field e.g. { streetAndNumber: \'Hooiland 20\', postalcode: \'3054 AX\' } in its request body'});
        return 
    };

    // Read user file to see if they already exists?
    _data.read('users', email, (err, data) => {
        if (!err) {
            // User already exists
            console.log(err);
            callback(400, {error: 'A user with email address ' + email + ' already exists'})
            return;
        }

        // Create new user object
        const newUser = {
            name,
            email,
            hashedPassword: helpers.hash(password),
            address,
        }
        _data.create('users', email, newUser, err => {
            if(!err) {
                callback(200);
            } else {
                console.log(err);
                callback(500, {'error': 'Could not create the new user'});
            }
        });

    });
};


handlers.ping = function(data, callback) {
    callback();
};


// Not found handler
handlers.notFound = function(data, callback) {
    callback(404);
};


// Available routes
const routesAndHandlers = {
    'api/users'         : handlers.users,
    'notFound'          : handlers.notFound,
    'public'            : handlers.public,
};

module.exports = routesAndHandlers;