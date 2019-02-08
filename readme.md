# ExpressJS API

## About
This app is built on ExpressJS using Node. It's a simple wrapper for TradeSatoshi's API services. \
It's written as a middleware for client-side web applications to communicate with TradeSatoshi. 
\
\
See https://tradesatoshi.com/Home/Api for more information

## Currently supported methods

### Private methods

| method            |  params  
| ----------------- | ------------- 
| getBalance        | currency          
| getBalances       | none              
| getOrder          | orderId                   
| getOrders         | market (optional), count (optional)
| submitOrder       | market, type, amount, price
| getTradeHistory   | market (optional), count (optional)

### Public methods

| method            |  params  
| ----------------- | ------------- 
| getCurrency       | symbol          
| getCurrencies     | none              
| getTicker         | market                   
| getMarketHistory  | market, count (optional)
| getMarketSummary  | market
| getMarketSummaries| market (optional), count (optional)
| getOrderBook      | market, type (optional), depth (optional)

### Usage
#### Example axios request:
```
    url: "https://tradesatoshiapi.olafur.io/",
    method: "POST",
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    data: {
        apiKey: API_KEY,
        secret: API_SECRET,
        params: {
            market : 'BTC_LTC',
            type: 'buy',
            amount: '1'
            price: 0.188435
        },
        method: 'submitOrder'
    },
    responseType: 'json'
```
### Live demo
https://tradesatoshiapi.olafur.io/
### Running locally
```
npm install
npm start
```
