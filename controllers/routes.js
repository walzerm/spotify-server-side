var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
    res.render('index');
})

router.post('/artist', function(req, res) {
        var url = 'https://api.spotify.com/v1/search?type=artist&q=' + req.body.q;
        request(url, function(err, response, body) {
            if (!err && response.statusCode === 200) {
                var data = JSON.parse(body);
                var artistObject = data.artists;
                var artists = artistObject.items;
                console.log(artists);
                res.render('artists', {artistData: artists});
            }
        })
})

router.get('/albums/:id', function(req, res) {
    var artistID = req.params.id;
    var albumURL = 'https://api.spotify.com/v1/artists/' + artistID + '/albums';
    var albumTrackArr = [];
    //create the object of artist's albums, keyed to album id
    request(albumURL, function(err, response, body) {
        if(!err && response.statusCode === 200) {
            var data = JSON.parse(body);
            var albumObj = data.items;

            albumObj.forEach(function(album) {
                //Get the tracks
                var trackArr = [];
                var trackURL = 'https://api.spotify.com/v1/albums/' + album.id + '/tracks';
                request(trackURL, function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var trackData = JSON.parse(body);
                        var trackObj = trackData.items;
                        trackObj.forEach(function(track) {
                            trackArr.push(track.name);

                        })
                    }
                    var albumTrackObj = {name: album.name, tracks: trackArr};

                    albumTrackArr.push(albumTrackObj);
                    console.log(albumTrackArr);
                    res.render('albums', {albumTrackArr: albumTrackArr});
                })
            })
        }
    })
})

module.exports = router;
