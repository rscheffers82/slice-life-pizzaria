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

 // Container for the users sub methods
_users = {};

handlers.users = function(data, callback) {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    const { method } = data;
    if (acceptableMethods.includes(method)) {
        _users[method](data, callback);
    } else {
        callback(405);
    }
}

// Create a new user
// Route            POST api/users
// Required data    name, email, password, address: {street, number, postalCode}
// Optional data    none
_users.post = (data, callback) => {
    const { name, email, password, address } = data.payload;

    // Payload validation
    if (!name) { callback(400, {error: 'Request should include name in its request body'}); return; };
    if (typeof(name) !== 'string') { callback(400, {error: 'Request should include a valid name in its request body'}); return; };
    if (!email) { callback(400, {error: 'Request should include email in its request body'}); return; };
    if (!helpers.validateEmail(email)) { callback(400, {error: 'Provided email address is invalid'}); return; };
    if (!password) { callback(400, {error: 'Request should include password in its request body'}); return; };
    if (!helpers.validatePassword(password)) { callback(400, {error: 'Request should include a valid password (min. 5 characters long)'}); return; };
    if (typeof(address) !== 'string' && address.trim().length === 0) { 
        callback(400, {error: 'The request should include and address field e.g. "Hooiland 20, 5663HC Geldrop" in its request body'});
        return 
    };

    // Read user file to see if they already exists?
    _data.read('users', email, (err, data) => {
        if (!err) {
            // User already exists
            console.log('User already exists: ', email);
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

// Get the data of a specific user
// Route            GET api/users
// Required data    email, password
// Optional data    none
_users.get = (data, callback) => {
    const { email } = data.queryStringObject;

    if (typeof(email) !== 'string' || !helpers.validateEmail(email)) {
        callback(400, {error: 'Missing or invalid email address provided'});
        return;
    }

    // Get the token from the headers
    const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;

    // handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
    //     if (tokenIsValid) {
            // Lookup the user
            _data.read('users', email, function(err, data) {
                if(!err && data) {
                    delete data.hashedPassword;
                    callback(200, data);
                } else {
                    callback(404, {error: 'User does not exist'});
                }
            })
        // } else {
        //     callback(403, {error: 'Missing required token in header, or token is invalid'});
        // }
    // });
};


// Users - put
// Required data: phone
// Optional data: first_name, last_name, password (at least one must be specified for the request to be valid)
_users.put = function(data, callback) {

    const { payload } = data;

    // Payload validation
    const email = helpers.validateEmail(payload.email) ? payload.email : false;
    const password = helpers.validatePassword(payload.password) ? payload.password : false;
    const name = typeof(payload.name) === 'string' && payload.name.trim().length > 0 ? payload.name : false;
    const address = typeof(payload.address) === 'string' && payload.address.trim().length > 0 ? payload.address : false;

    if (!email) {
        callback(400, {error: 'The request should include and address field e.g. "Hooiland 20, 5663HC Geldrop" in its request body'});
        return;
    }

    if (!password && !name && !address) {
        callback(400, {error: 'Missing fields to update'});
        return;
    }

    // Get the token from the headers
    const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;

    // handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
    //     if (tokenIsValid) {
    //         // lookup the user
            _data.read('users', email, function(err, userData) {
                if(!err && userData) {
                    // Update the fields.

                    if(name) {
                        userData.name = name;
                    }
                    if(address) {
                        userData.address = address;
                    }
                    if(password) {
                        userData.hashedPassword = helpers.hash(password);
                    }

                    // Store the new updates
                    _data.update('users', email, userData, function(err){
                        if(!err) {
                            callback(200);
                        } else {
                            console.log(err);
                            callback(500, {error: 'Unable to update user data'});
                        }
                    })
                } else {
                    callback(400, {error: 'The specified user does not exist'});
                }
            });
    //     } else {
    //         callback(403, {error: 'Missing required token in header, or token is invalid'});
    //     }
    // });
};

// Users - delete
// Required field: phone
// Optional fields: none
_users.delete = function(data, callback) {

    const email = helpers.validateEmail(data.queryStringObject.email) ? data.queryStringObject.email : false;

    if (!email) {
        callback(400, {error: 'The request should include and address field e.g. "Hooiland 20, 5663HC Geldrop" in its request body'});
        return;
    }

        // Get the token from the headers
        const token = typeof(data.headers.token) === 'string' ? data.headers.token : false;

        // handlers._tokens.verifyToken(token, phone, function(tokenIsValid) {
        //     if (tokenIsValid) {
                // Lookup the user
                _data.read('users', email, function(err, userData) {
                    if(!err && userData) {
                        _data.delete('users', email, function(err){
                            if(!err) {
                                    callback(200);
                            } else {
                                callback(500, {error: 'Could not delete specified user'});
                            }
                        });
                    } else {
                        callback(400, {error: 'Could not find specified user'});
                    }
                })
        //     } else {
        //         callback(403, {error: 'Missing required token in header, or token is invalid'});
        //     }
        // });
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