var Vero = require('../index.js').EventLogger;

var auth_token = process.env['VERO_TOKEN'];

var dev_mode = true;

var veroLogger = new Vero(auth_token, dev_mode);

var user_id = 1982

// veroLogger.addUser(user_id, 'dmckenna@hubdoc.com', function (err, res, body) {
//     console.log(body);
// });

// veroLogger.editUser(user_id, {name: 'peter'}, function (err, res, body) {
//     console.log(body);
// });

// veroLogger.addTags(user_id, '["chewbacca", "han"]', function (err, res, body) {
//     console.log(body);
// });

// veroLogger.removeTags(user_id, '["chewbacca"]', function (err, res, body) {
//     console.log(body);
// });

veroLogger.addEvent(user_id, 'uploaded_doc', {doc_type: 'pdf'},
function (err, res, body) {
    console.log(body);
});

// veroLogger.unsubscribeUser(user_id, function (err, res, body) {
//     console.log(body);
// });