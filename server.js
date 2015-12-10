var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// Your Server Code Here

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server up and listening on', port);
});