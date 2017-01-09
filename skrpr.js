var request = require('request');
var cheerio = require('cheerio');

var URL = 'https://www.indeed.com/jobs?q=%22junior+web+developer%22&l=Seattle,+WA&explvl=entry_level';

request(URL, function(err, response, body) {
  var $ = cheerio.load(body);
  var jobs = $("#resultsCol .result");

	//iterate through the list of found plays
  jobs.each(function(index, job) {
    // the each function gives us the raw HTML element.
	  // convert the element back to a cheerio
    job = $(job);
  //
    var title = job.find(".turnstileLink");
    var company = job.find(".company");
    var summary = job.find(".summary");
    var link = job.find("a.turnstileLink");
  //   var timestamp = play.find(".AirDate span");
  //   var releasename = play.find(".ReleaseMetadata .ReleaseName");

    // console.log(artist.text());
    // console.log(track.text());
    // console.log(releasename.text());
    // console.log(timestamp.text());
    // console.log(jobs);
    console.log("Title:", title.text().trim());
    console.log("Company:", company.text().trim());
    console.log("Summary:", summary.text().trim());
    console.log("Link:", link.attr('href').trim());
  });
});
