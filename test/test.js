var Vero = require('../index.js').EventLogger;

var auth_token = process.env['VERO_TOKEN'];

var dev_mode = true;

var veroLogger = new Vero(auth_token, dev_mode);

// veroLogger.addUser(1982, 'dmckenna@hubdoc.com', function () {
//     console.log(arguments);
// });

// veroLogger.editUser(1982, {name: 'peter'}, function () {
//     console.log(arguments);
// });

// veroLogger.addTags(1982, '["chewbacca", "han"]', function () {
//     console.log(arguments);
// });

// veroLogger.removeTags(1982, '["chewbacca"]', function () {
//     console.log(arguments);
// });

// veroLogger.addEvent(1982, 'uploaded_doc', {doc_type: 'pdf'},
// function (err, res, body) {
//     console.log(body);
// });

veroLogger.unsubscribeUser(1982, function (err, res, body) {
    console.log(body);
});