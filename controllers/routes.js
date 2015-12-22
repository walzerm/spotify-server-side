var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
    res.render('index');
})

//Gets the artists from the artist search
router.post('/artist', function(req, res) {
    var url = 'https://api.spotify.com/v1/search?type=artist&q=' + req.body.q;
    request(url, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            var data = JSON.parse(body);
            var artistObject = data.artists;
            var artists = artistObject.items;
            res.render('artists', {artistData: artists});
        }
    })
})

//Gets the albums for the selected artist
router.get('/albums/:id', function(req, res) {
    var artistID = req.params.id;
    var albumURL = 'https://api.spotify.com/v1/artists/' + artistID + '/albums';
    var albumTrackArr = [];
    //create the object of artist's albums, keyed to album id
    request(albumURL, function(err, response, body) {
        if(!err && response.statusCode === 200) {
            var data = JSON.parse(body);
            var albumObj = data.items;
            var count = 1;
            albumObj.forEach(function(album) {
                //Get the tracks with the album ID
                var trackArr = [];
                var trackURL = 'https://api.spotify.com/v1/albums/' + album.id + '/tracks';

                request(trackURL, function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var trackData = JSON.parse(body);
                        var trackObj = trackData.items;
                        trackObj.forEach(function(track) {
                            trackArr.push(track.name); //push the track names to an array
                        })//closes trackObj.forEach
                    }//closes the if statement
                    //Create an object with the album name and the array of tracks
                    var albumTrackObj = {name: album.name, tracks: trackArr};
                    //Push the album and track object to an array of albums and tracks for the artist
                    albumTrackArr.push(albumTrackObj);
                    //If the Array is complete, send it to albums.ejs
                    if (albumTrackArr.length === albumObj.length) {
                        res.render('albums', {albumTrackArr: albumTrackArr});
                    } //closes the if statement
                })//closes the track request
            })//closes albumOnj.forEach
        }//closes the if statemet for request(albumURL)
    })//closes request(albumURL)
})//closes router.get

module.exports = router;
