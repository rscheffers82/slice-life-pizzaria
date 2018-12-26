/*  
 *
 * Router and handlers for Pizza API
 * 
 */ 

// Dependencies
const helpers   = require('./helpers');
const config    = require('../config');

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

// Users - Create a new user
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback) {
    callback(false, {message: 'server is setup and accepts incoming POST requests'});
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