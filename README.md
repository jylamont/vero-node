# Usage
```js
var Vero = require('vero-node').EventLogger;
var authToken = process.env['VERO_TOKEN'];
var devMode = true; // false in PRODN
var veroLogger = new Vero(authToken, devMode);

veroLogger.addUser(1982, 'user@person.com', function (err, res, body) {
    if (err) return console.log(err);
    console.log(body); // { status: 200, message: 'Success.' }
});

veroLogger.addEvent(1982, 'uploaded_doc', {doc_type: 'pdf'}, function (err, res, body) {
    if (err) return console.log(err);
    console.log(body); // { status: 200, message: 'Success.' }
});

```