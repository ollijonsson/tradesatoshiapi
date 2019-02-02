// Import dependencies
const request = require('requestretry');
 
//Import modules
const buildURL = require('./buildURL');

// Public API calls
async function publicRequest(params, options) {

    // Build URL for public request
    let urlParams;
    if (params) {
        urlParams = typeof params === 'object' ? buildURL(params) : params;
    }

    // Request object for Fetch API
    let requestObject = {
        url: urlParams ? 
            options.baseURL + "/public/" + options.path+ "?" + urlParams : 
            options.baseURL + "/public/" + options.path,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        json: true,
        maxAttempts: 50,
        retryDelay: 500
    }

    // Fetching from TradeSatoshi
    try {
        let response = await request.get(requestObject);
        response = response.body;
        return response.success ? response.result : Promise.reject(response.message);
    } catch (err) {
        return Promise.reject('Error with publicRequest: ' + err)
    }
}

module.exports = publicRequest;