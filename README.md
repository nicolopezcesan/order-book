
# 🔄 Exchange Order Book

## 📝 Notas

Este repositorio corresponde a la solución para un challenge técnico.

La implementación es una API que permite obtener el libro de órdenes para cualquier par symbol de cryptomonedas ingresando dicho par y el nombre del exchange que se desea consultar. 

Se disponibiliza un endpoint GET /orderBook que espera recibir como query param el par symbol (BTCUSDT, EHTUSDT, etc), nombre del exchange, y como agregado establecer el límite de filas esperadas en la respuesta.

--
  

### 📢 Ejemplo CURL:

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
