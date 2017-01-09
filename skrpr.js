var request = require('request');
var cheerio = require('cheerio');

var URL = 'http://kexp.org/playlist/2007/1/4/3pm';

request(URL, function(err, response, body) {
  var $ = cheerio.load(body);
  var plays = $(".Play");

	// iterate through the list of found plays
  plays.each(function(index, play) {
    // the each function gives us the raw HTML element.
	  // convert the element back to a cheerio
    play = $(play);

    var artist = play.find(".ArtistName");
    var track = play.find(".TrackName");
    var timestamp = play.find(".AirDate span");
    var releasename = play.find(".ReleaseMetadata .ReleaseName");

    console.log(artist.text());
    console.log(track.text());
    console.log(releasename.text());
    console.log(timestamp.text());
    console.log();
  });
});
