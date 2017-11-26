//requirements variables
var axios = require("axios");
var spotify = require("node-spotify-api");
var twitter = require("twitter");
var fs = require("fs");
var keys = require("./keys.js");
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

if (input1 === "movie-this" && input2 !== "") {
    axios.get("http://www.omdbapi.com/?t=" + input2 + "&apikey=" + omdbKey)
        .then(function(response) {
            console.log("Title: " + response.data.Title)
            console.log("Year: " + response.data.Year)
            console.log("IMDB Rating: " + response.data.Ratings[0].Value)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Cast: " + response.data.Actors)
        })
        .catch(function(error) {
            console.log(error)
        })
} else if (input1 === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&apikey=" + omdbKey)
        .then(function(response) {
            console.log("Title: " + response.data.Title)
            console.log("Year: " + response.data.Year)
            console.log("IMDB Rating: " + response.data.Ratings[0].Value)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Cast: " + response.data.Actors)
        })
} else if (input1 === "my-tweets") {
    var client = new twitter({
        consumer_key: twitCK,
        consumer_secret: twitCS,
        access_token_key: twitAT,
        access_token_secret: twitAS
    });
    var params = { dustin_strange: 'nodejs' };
    client.get('search/tweets', { q: 'node.js' }, function(error, tweets, response) {
        console.log(tweets);

    });
} else if (input1 === "spotify-this-song" && input2 !== "") {
    spotify.search({ type: 'track', query: input2 }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        // Do something with 'data'
        else {
            console.log(data);
        }
    });
}