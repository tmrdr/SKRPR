var request = require('request');
var cheerio = require('cheerio');

var x = "junior+web+developer";

var URL = 'https://www.indeed.com/jobs?q=' + x + '&l=Seattle,+WA&explvl=entry_level';

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

    console.log("Title:", title.text().trim());
    console.log("Company:", company.text().trim());
    console.log("Summary:", summary.text().trim());
    console.log("Link:", link.attr('href').trim());
  });
});
