var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('/public'));


/*

app.get("/", function (req, res) {
    request.get('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj', function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            //var result = movieData.artists;
            res.send(movieData.artists[0].name);
        }
    });
});*/

var routes = require('./controllers/routes');
app.use('/', routes);

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server up and listening on', port);
});
