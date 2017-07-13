
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var command = process.argv[2];


if(command === "my-tweets"){
	console.log("display tweets");
	//This will show your last 20 tweets and when they were created at in your terminal/bash window.
}
if(command === "spotify-this-song"){
	console.log("spotifying song");
 
	var spotify = new Spotify({
	  id: keys.spotifyKeys.client_ID,
	  secret: keys.spotifyKeys.client_secret,
	});
	 
	spotify
	  .search({ type: 'track', query: 'All the Small Things' })
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
	`node liri.js spotify-this-song '<song name here>'`
	
	* This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
	*/
}
if(command === "movie-this"){
	console.log("getting movie info");
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



