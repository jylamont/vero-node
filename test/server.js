var express = require('express');
var bodyParser = require('body-parser');
var port = 4242;

/*
** Test server
*/
express()
  .use(bodyParser())
  .post("/api/v2/users/track", fixture)
  .put("/api/v2/users/edit", fixture)
  .put("/api/v2/users/tags/edit", fixture)
  .post("/api/v2/users/unsubscribe", fixture)
  .post("/api/v2/events/track", fixture)
  .listen(port, function(){
    console.log("  Testing server listining on " + port);
    console.log();
    console.log();
  });

/*
** Moch of server response
*/
function fixture (req, res, next) {
  res.json(200);
}