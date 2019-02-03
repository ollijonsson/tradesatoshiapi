// Import dependencies
const request = require('requestretry');

// Import modules
const buildAuth = require('./buildAuth');

// Private API calls
async function privateRequest(params, options) {

    // Request object for Fetch API
    let requestObject = {
        url: options.baseURL + "/private/" + options.path,
        headers: {
            'Authorization': buildAuth(params, options),
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(params),
        maxAttempts: 200,
        retryDelay: 3000
    }

    // Fetching from TradeSatoshi
    try {
        let response = await request.post(requestObject);
        response = JSON.parse(response.body);
        return response.success ? Promise.resolve(response.result) : Promise.reject(response.message);
    } catch (err) {
        return Promise.reject('Error with privateRequest: ' + err)
    }
}

module.exports = privateRequest;