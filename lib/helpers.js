
const http          = require('http');
const https         = require('https');
const queryString   = require('querystring');
const crypto        = require('crypto');
const config        = require('../config');

const helpers = {};

 // Parse a JSON string to an object in all case, without throwing
 helpers.parseJsonToObject = function(str) {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch(err) {
        return {};
    }
};

helpers.validateEmail = email => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailIsValid = email.match(emailRegex) !== null;
    return emailIsValid;
};

helpers.validatePassword = password => {
    // Add extra logic for password validation as needed
    return typeof(password) === 'string' && password.length >= 5;
};

// Create a SHA256 hash
helpers.hash = function(str) {
    if(typeof(str) === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

 // Create a string with random alphanumeric characters of a given length
 helpers.createRandomString = strLength => {
    strLength = typeof(strLength) === 'number' && strLength > 0 ? strLength : false;

    // Return false strLength is invalid
    if (!strLength) return false;

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const str = new Array(strLength)
        .fill(0)
        .map(char => chars[Math.floor(Math.random() * chars.length)])
        .join('');
    return str;
};

module.exports = helpers;