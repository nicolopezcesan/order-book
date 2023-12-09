
CHALLENGE - EXCHANGES - ORDER BOOKS

## Notas

Hay ciertos ajustes que no fueron implementados, pero me gustaría aclarar que soy consciente de que existen, como por ejemplo:

- Los valores de configuración de cada exchange deberian pasarse a variables de entorno

- Manejar excepciones de manera que se pueda conocer con mayor exactitud la profundida del error y desde dónde proviene.

- Para la respuesta, si bien definí una estructura estándar para las response (a través de modelos) faltaría agregar status code, y alguna respuesta global a nivel api. Con respecto a la respuesta del modelo, se debería ajustar el tipo de dato que se está devolviendo para las diferentes propiedades, donde varían según el exchange. Ejemplo, los timestamp (un servicio lo devuelve como string y otro como number), o incluso estandarizar la cantidad de decimales para los valores de precio y cantidad de las ordenes.

- Para los tests debería agregar tests para todas las casuisticas posibles, y usar un mock en vez de apuntar al servicio real como funciona actualmente.

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
