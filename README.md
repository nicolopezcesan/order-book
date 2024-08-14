
# 🔄 Exchange Order Book

## 📝 Notes

This repository corresponds to the solution of a technical challenge.

The implementation is an API that allows obtaining the order book of any cryptocurrency pair symbol through different exchanges.

A GET /orderBook endpoint is available that expects to receive as a query parameter the symbol of the pair, name of the exchange and also allows defining the limit of rows expected in the response.


--
  

### 📢 Example CURL:

To interact with this service, you can use the following CURL command:

Para interactuar este servicio, puedes utilizar el siguiente comando CURL:
```bash
curl --location '{{LOCAL_API}}/order-book?exchange=BINANCE&base_coin=ETH&quote_coin=USDT&limit=5'
```

--

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
