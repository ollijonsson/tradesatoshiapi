    // Import dependencies
    const crypto = require('crypto');
    
    // Build authorization string 
    
    function buildAuth(params, opts) {
        // Unique indicator for each request
        let nonce = crypto.randomBytes(64).toString('hex');

        // JSON post parameters (base64 encoded)
        let postParams = new Buffer(JSON.stringify(params)).toString('base64');

        // Create request signature
        let signature = opts.apiKey + "POST" + encodeURIComponent(opts.baseURL + "/private/" + opts.path).toLowerCase() + nonce + postParams;
        
        // Request signature signed by secret key according to HMAC-SHA512 method.
        let hmacsignature = crypto.createHmac('sha512', new Buffer(opts.apiSecret, "base64")).update(signature).digest().toString('base64');
        return "amx " + opts.apiKey + ":" + hmacsignature + ":" + nonce;
    }

module.exports = buildAuth;