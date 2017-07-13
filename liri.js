
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

var command = process.argv[2];

//This will show your last 20 tweets and when they were created at in your terminal/bash window.
if(command === "my-tweets"){
	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret,
	});
	 
	var params = {screen_name: 'tony_storti'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
	    	console.log("---------tony_storti tweets--------");
	    	for (var i=0;i<tweets.length;i++){
	    		console.log("--------tweet #"+(i+1)+"---------");
	    		console.log("Message: "+ tweets[i].text);
				console.log("Created at: "+ tweets[i].created_at);
	    	}
	  	}
	});	
}

//this will show information related to the first song returned by spotify query for user-entered song title
if(command === "spotify-this-song"){
	var songTitle = process.argv[3];
 
	var spotify = new Spotify({
	  id: keys.spotifyKeys.client_ID,
	  secret: keys.spotifyKeys.client_secret,
	});
	 
	spotify
	  .search({ type: 'track', query: songTitle })
	  .then(function(response) {
	    //artist name
	    console.log(response.tracks.items[0].artists[0].name);
	    //track name
	    console.log(response.tracks.items[0].name);
	    //preview link
	    console.log(response.tracks.items[0].external_urls.spotify);
	    //album
	    console.log(response.tracks.items[0].album.name);

	  })
	  .catch(function(err) {
	    console.log(error);
	  });

	/*

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
	*/
}
if(command === "movie-this"){
	
	var movieTitle = process.argv[3];
	var omdbURL = "http://www.omdbapi.com/?apikey="+keys.omdbKeys.api_key+"&t="+movieTitle;

	request(omdbURL, function (error, response, body) {
		 
  		if(error ===null){
  			console.log(body);
  			console.log("--------------------");
  			//console.log(body.Title);
  			//console.log(body.Year);
  			//console.log(body.imdbRating);
  			//console.log(body.Ratings);
  			//console.log(body.Country);
  			//console.log(body.Language);
  			//console.log(body.Plot);
  			//console.log(body.Actors);
  		}
		else{
			console.log('statusCode:', response && response.statusCode);
			console.log("error:", error);
		}
	});
	/*
	`node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
     */
}
if(command === "do-what-it-says"){
	console.log("doing what it says");

	/*
	`node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.
     */
}



