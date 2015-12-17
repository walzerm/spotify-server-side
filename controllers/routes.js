var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
    res.render('index');
})

router.post('/artist', function(req, res) {
    //var parsedData = '';
    //    req.on('data', function(chunk) {
    //        parsedData += chunk;
    //    });
    //    req.on('end', function(){
    //    var pd = parsedData.split('=');
        var url = 'https://api.spotify.com/v1/search?type=artist&q=' + pd[1];
    //    var artistArr = [];
        request.get(url, function(err, response, body) {
            if (!err && response.statusCode === 200) {
                data = JSON.parse(body);
                var artistObject = data.artists;
                var artists = artistObject.items;
                artists.forEach(function(artist) {
                    console.log(artist.name);
                    artistArr.push(artist.name);
                })
                res.send(artistArr);
                res.end();
            }
        })
        //res.write(artists);

    })
})

module.exports = router;
