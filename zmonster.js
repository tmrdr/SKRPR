var request = require('request');
var cheerio = require('cheerio');

var x = "junior-web-developer";

var URL = 'https://www.monster.com/jobs/search/?q=' + x +'&where=seattle;'

request(URL, function(err, response, body) {
  var $ = cheerio.load(body);
  var jobs = $(".js_result_row");

	//iterate through the list of found plays
  jobs.each(function(index, job) {
    // the each function gives us the raw HTML element.
	  // convert the element back to a cheerio
    job = $(job);
  //
    var title = job.find(jobs);
    // var company = job.find(".company");
    // var summary = job.find(".summary");
    // var link = job.find("a.turnstileLink");

    console.log("Title:", title.text().trim());
    console.log("Company:", company.text().trim());
    console.log("Summary:", summary.text().trim());
    console.log("Link:", link.attr('href').trim());
  });
});
