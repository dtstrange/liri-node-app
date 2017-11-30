//requirements variables
var axios = require("axios");
var Spotify = require("node-spotify-api");
var twitter = require("twitter");
var fs = require("fs");
var keys = require("./keys.js");
var http = require('http');
var https = require('https');
//keys variables
var twitCK = keys.twitterKeys.consumer_key;
var twitCS = keys.twitterKeys.consumer_secret;
var twitAT = keys.twitterKeys.access_token;
var twitAS = keys.twitterKeys.access_secret;
var spotID = keys.spotifyKeys.client_id;
var spotCS = keys.spotifyKeys.client_secret;
var omdbKey = keys.omdbKey;
//input variables
var input1 = process.argv[2];
var input2 = process.argv[3];
for(i=4; i<process.argv.length; i++){
    input2 += '+' + process.argv[i];
}
//spotify security
var spotify = new Spotify({
    id: spotID,
    secret: spotCS
});


// axios call to get movie data
function movieThis() {
    if (input1 === "movie-this" && input2 !== undefined) {
        axios.get("http://www.omdbapi.com/?t=" + input2 + "&apikey=" + omdbKey)
            .then(function (response) {
                console.log("Title: " + response.data.Title);
                console.log("===========");
                console.log("Year: " + response.data.Year);
                console.log("===========");
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                console.log("===========");
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("===========");
                console.log("Country: " + response.data.Country);
                console.log("===========");
                console.log("Language: " + response.data.Language);
                console.log("===========");
                console.log("Plot: " + response.data.Plot);
                console.log("===========");
                console.log("Cast: " + response.data.Actors);
                console.log("===========");
            })

    } else {
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&apikey=" + omdbKey)
            .then(function (response) {
                console.log("Title: " + response.data.Title);
                console.log("===========");
                console.log("Year: " + response.data.Year);
                console.log("===========");
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                console.log("===========");
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("===========");
                console.log("Country: " + response.data.Country);
                console.log("===========");
                console.log("Language: " + response.data.Language);
                console.log("===========");
                console.log("Plot: " + response.data.Plot);
                console.log("===========");
                console.log("Cast: " + response.data.Actors);
                console.log("===========");
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}
//function to call tweets
function myTweets() {
    if (input1 === "my-tweets") {
        var client = new twitter({
            consumer_key: twitCK,
            consumer_secret: twitCS,
            access_token_key: twitAT,
            access_token_secret: twitAS
        });
        var params = { dustin_strange: 'nodejs' };
        client.get('search/tweets', { q: 'node.js' }, function (error, tweets, response) {

            for (i = 0; i < 10; i++) {
                console.log("Tweets: " + tweets.statuses[i].text);
                console.log("===========");
            }

        });


    }
}
//function to search a song on spotify
function spotifyThis() {

    if (input1 === "spotify-this-song" && input2 !== undefined) {

        spotify.search({ type: 'track', query: '"' + input2 + '"' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //limit to 10 results
            for (i = 0; i < 10; i++) {

                console.log(data.tracks.items[i].artists[0].name);
                console.log(data.tracks.items[i].name);
                console.log(data.tracks.items[i].preview_url);
                console.log(data.tracks.items[i].album.name);
                console.log("============")

            }


        });
    }
    else {
        spotify.search({ type: 'track', query: "the sign" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //limit to 10 results
            for (i = 0; i < 10; i++) {

                console.log(data.tracks.items[i].artists[0].name);
                console.log(data.tracks.items[i].name);
                console.log(data.tracks.items[i].preview_url);
                console.log(data.tracks.items[i].album.name);
                console.log("============")

            }
        });
    }
}

function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err)
        } else {
            //split file into searchable array
            var txtData = data.split(",");
            input1 = txtData[0];
            input2 = txtData[1];
            

            switchCase();

        }
    })
}

//switch case function for the input commands.
function switchCase() {
    switch (input1) {
        case 'movie-this':
            movieThis();
            break;

        case 'my-tweets':
            myTweets();
            break;

        case 'spotify-this-song':
            spotifyThis();
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;


    }
}


switchCase();