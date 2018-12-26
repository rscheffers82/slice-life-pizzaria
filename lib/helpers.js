
const http             = require('http');
const https             = require('https');
const queryString       = require('querystring');

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

module.exports = helpers;