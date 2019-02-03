// Build URL from an array of parameters

function buildURL(params){
	let returnArr = [];
	
	// Loop through params and push to array
    for (let i in params) {
	  returnArr.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
	}

	// Join URL params
    return returnArr.join('&');
}

module.exports = buildURL;