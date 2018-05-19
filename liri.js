require("dotenv").config();
var fs = require("fs")
var keys = require("./keys")

var Spotify = require("node-spotify-api")
var Twitter = require("twitter")
var request = require("request")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var programToRun = process.argv[2];
var programAction = process.argv[3];

if(programToRun == "my-tweets"){
    myTweets();
}else if(programToRun == "spotify-this-song"){
    spotifyThisSong(programAction);
}else if(programToRun == "movie-this"){
    movieThis(programAction);
}else if(programToRun == "do-what-it-says"){
    doWhatItSays();
}else {
    console.log("You need to specify a program.")
    console.log("Please select: my-tweets, spotify-this-song, movie-this, or do-what-it-says")
}

function myTweets(){
    //pulling tweets from CNN bc I don't have any on my own
    var params = {screen_name: 'cnn'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for(var i=0; i<20; i++){
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log(" ")
            }
            
        }
    });
}

function spotifyThisSong(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //artist name
      console.log("Artist: " + data.tracks.items[0].artists[0].name); 
      //song name
      console.log("Song: " + data.tracks.items[0].name);
      //link to preview
      console.log("Preview: " + data.tracks.items[0].external_urls.spotify); 
      //album name
      console.log("Album: " + data.tracks.items[0].album.name);   
      });
}

function movieThis(movie){
  request('http://www.omdbapi.com/?apikey=trilogy&t=' + movie, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
       
        //movie title
        var movieInfo = JSON.parse(body)
        console.log("Title: " + movieInfo.Title)
        //movie year
        console.log("Year: " + movieInfo.Year)
        //IMDB rating
        console.log("IMDB Rating: " + movieInfo.imdbRating)
        //Rotten Tomatoes rating
        console.log(movieInfo.Ratings[1].Source + ": " + movieInfo.Ratings[1].Value)
        //Country
        console.log("Country: " + movieInfo.Country)
        //Language
        console.log("Language(s): " + movieInfo.Language)
        //Plot
        console.log("Plot: " + movieInfo.Plot)
        //Actors
        console.log("Actors: " + movieInfo.Actors)
});
}

function doWhatItSays(){
 fs.readFile('random.txt', "UTF-8", function(err, data){
     console.log(data)

     var array = data.split(",")

     spotify.search({ type: 'track', query: array[1] }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //artist name
      console.log("Artist: " + data.tracks.items[0].artists[0].name); 
      //song name
      console.log("Song: " + data.tracks.items[0].name);
      //link to preview
      console.log("Preview: " + data.tracks.items[0].external_urls.spotify); 
      //album name
      console.log("Album: " + data.tracks.items[0].album.name);   
      });
 });
 }


