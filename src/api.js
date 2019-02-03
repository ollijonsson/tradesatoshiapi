// Import modules
const publicRequest = require('./functions/publicRequest');
const privateRequest = require('./functions/privateRequest');

// Trader methods
let api = () => {

    // Return calls to privateRequest or publicRequest
    return {

        // Get balance information for a single currency
        getBalance: async (params = {}, options) => {
            if(!params.currency){
	            return Promise.reject("You must supply a valid currency");
            }
            return privateRequest(params, options);
        },

        // Get balance information for all balances
        getBalances: async (params = {}, options) => {
            return privateRequest(params, options);
        },

        // Get order information for a single order ID
        getOrder: async (params = {}, options) => {
            if (!params.orderId) {
                return Promise.reject("You must supply a valid OrderID");
            }
            return privateRequest(params, options);
        },

        // Get order information for all orders
        getOrders: async (params = {}, options) => {
            return privateRequest(params, options);
        },
        
        // Submit an order with legal parameters
        submitOrder: async (params = {}, options) => {
            if (!params.market) {
                return Promise.reject("You must supply a valid market or trade pair ID");
            } else if (params.type && params.type !== 'Buy' && params.type !== 'Sell') {
                return Promise.reject("You must supply a valid Type");
            } else if (!params.amount || typeof params.amount !== 'number') {
                return Promise.reject("You must supply a valid Amount");
            } else if (!params.price || typeof params.price !== 'number' ) {
                return Promise.reject("You must supply a valid price");
            }
            return privateRequest(params, options);
        },

        // Get trade history for most recent trades
        getTradeHistory: async (params = {}, options) => {
            return privateRequest(params, options);
        },

        // Get details about a single currency
        getCurrency: async (params = {}, options) => {  
            urlParams = `Symbol=${params}`;
            return publicRequest(urlParams, options);
        },

        // Get details about all currencies
        getCurrencies: async (params = {}, options) => {
            return publicRequest(null, options);
        },

        // Get simple information about a single currency
        getTicker: async (params = {}, options) => {        
            return publicRequest(params, options);
        },

        // Get market history for a single market
        getMarketHistory: async (params = {}, options) => {
            if(!params.market){
                return Promise.reject("You must supply a valid market or trade pair ID");
            }
            return publicRequest(params, options);
        },

        // Get details about a single market
        getMarketSummary: async (params = {}, options) => {
            if(!params.market){
              return Promise.reject("You must supply a valid market or trade pair ID");
            }
	          return publicRequest(params, options);
        },

        // Get details about all markets
        getMarketSummaries: async (params = {}, options) => {
            return publicRequest(null, options);
        },

        // Get order book for a single market
        getOrderBook: async (params = {}, options)  => {
            if (!params.market) {
	            return Promise.reject("You must supply a valid Market or trade pair ID");
            }
            return publicRequest(params, options);
        }
    }
};


module.exports = api;