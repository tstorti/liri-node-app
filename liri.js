
//require node modules and keys file
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var file = require('file-system');

var command = process.argv[2];

//This will show the last 20 tweets of specified user and when they were created at in your terminal/bash window.
if(command === "my-tweets"){
	var screenName = "TheOnion";
	logInfo(command+"\n");
 	logInfo(screenName+"\n");
	getTweets(screenName);
}

//this will show information related to the first song returned by spotify query for user-entered song title
if(command === "spotify-this-song"){
	var songTitle="";
	for (var i = 3; i < process.argv.length; i++) {
		// Build a string with the song title.
		songTitle = songTitle + " " + process.argv[i];
	}
	songTitle=songTitle.trim();
 	//default song title if user does not include a song name with the command
 	if (songTitle === ""){
 		songTitle = "Ace of Base The Sign";
 	}
 	//get the spotify information and output it to the terminal
 	logInfo(command+"\n");
 	logInfo(songTitle+"\n");
 	spotifySong(songTitle);	
}

//run the movie-this function if user enters that command
if(command === "movie-this"){
	var movieTitle="";
	for (var i = 3; i < process.argv.length; i++) {
		// Build a string with the song title.
		movieTitle = movieTitle + " " + process.argv[i];
	}
	movieTitle=movieTitle.trim();
	//get the movie information and output it to the terminal
	logInfo(command+"\n");
 	logInfo(movieTitle+"\n");
	movieThis(movieTitle);
}

//read the random.txt file and run the appropriate function
if(command === "do-what-it-says"){
		doWhatItSays();
}

//this function read the twitter api keys and gets the requested information before outputting to the terminal
function getTweets(username){
	var client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret,
	});
	 
	var params = {screen_name: username};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
	    	console.log("---------tony_storti tweets--------");
	    	for (var i=0;i<tweets.length;i++){
	    		console.log("--------tweet #"+(i+1)+"---------");
	    		console.log("Message: "+ tweets[i].text);
				console.log("Created at: "+ tweets[i].created_at);
				//output same info to log.txt
				logInfo(tweets[i].text+" "+tweets[i].created_at+ "\n");
	    	}
	  	}
	});	
};

//this function uses the omdb api to retrieve information on the requested title.
function movieThis(title){
	
	var omdbURL = "http://www.omdbapi.com/?apikey="+keys.omdbKeys.api_key+"&t="+title;

	request(omdbURL, function (error, response, body) {
		 
  		if(error ===null){
  			//convert data into a JSON object
  			var data = JSON.parse(body);
  			
  			console.log("--------------------");
  			console.log("Title: " + data.Title);
  			console.log("Released in: "+ data.Year);
  			console.log("IMDB Rating: "+ data.imdbRating);
  			//if movie has a Rotten Tomatoes Rating, display it
  			if(data.Ratings !== undefined){
  				console.log("Rotten Tomatoes Rating: "+ data.Ratings[1].Value);
  			}
  			console.log("Produced in: "+ data.Country);
  			console.log("Language(s): "+ data.Language);
  			console.log("Plot: "+ data.Plot);
  			console.log("Actors: "+ data.Actors);
  			
  			//output same info to log.txt
  			logInfo(data.Title+"\n");
			logInfo(data.Year+"\n");
			logInfo(data.imdbRating+"\n");
			if(data.Ratings !== undefined){
  				logInfo(data.Ratings[1].Value+"\n");
  			}
			logInfo(data.Country+"\n");
			logInfo(data.Language+"\n");
			logInfo(data.Plot+"\n");
			logInfo(data.Actors+"\n");
		}

		else{
			console.log('statusCode:', response && response.statusCode);
			console.log("error:", error);
		}
	});

};

//this function uses the spotify api to retrieve information related to a song title
function spotifySong(title){

	var spotify = new Spotify({
		id: keys.spotifyKeys.client_ID,
		secret: keys.spotifyKeys.client_secret,
	});
	 
	spotify
		.search({ type: 'track', query: title })
		.then(function(response) {
			//artist name
			console.log(response.tracks.items[0].artists[0].name);
			//track name
			console.log(response.tracks.items[0].name);
			//preview link
			console.log(response.tracks.items[0].external_urls.spotify);
			//album
			console.log(response.tracks.items[0].album.name);
			//output same info to log.txt
			logInfo(response.tracks.items[0].artists[0].name+"\n");
			logInfo(response.tracks.items[0].name+"\n");
			logInfo(response.tracks.items[0].external_urls.spotify+"\n");
			logInfo(response.tracks.items[0].album.name+"\n");
		})
		.catch(function(err) {
			console.log(error);
		});
};

//this function reads the random.txt file to execute the appropriate function.
function doWhatItSays(){

	var content = "";
	file.readFile('./random.txt', 'utf8', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    content = data;
	    //console.log(content);
	    newCommand = content.split(",")[0];
	    
	    value = content.split(",")[1];
	    
	    logInfo("do-what-it-says "+ newCommand+"\n");
 		logInfo(value+"\n");
	    //allow for changes to the random file with a different command
	    if (newCommand ==="spotify-this-song"){
	    	spotifySong(value);
	    }
	    else if (newCommand ==="movie-this"){
	    	movieThis(value);
	    }
	    else if(newCommand ==="my-tweets"){
	    	getTweets(value);
	    }
	});
};
function logInfo(data){
	file.appendFile("log.txt", data, function(err) {
	// If an error was experienced we say it.
		if (err) {
			console.log(err);
		}

	});
};



