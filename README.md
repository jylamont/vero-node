# vero-node

A node.js client for [Vero](https://www.getvero.com)

## Usage

```js
var Vero = require('vero-node').Vero;
var veroClient = new Vero("YOUR_AUTH_TOKEN");

veroClient.identify({
  id: 'jeff@yourdomain.com'
  , userProperties: {
    firstName: 'Jeff'
    , lastName: 'Kane'
  }
})

veroClient.track({
  id: 'jeff@yourdomain.com'
  , eventName: 'view_product'
  , eventProperties: {
    sku: 'TS123'
    , color: 'Blue'
    , size: 12
  }
})
```

## Documentation

Documentation is available at [https://www.getvero.com/docs/api/node](https://www.getvero.com/docs/api/node)