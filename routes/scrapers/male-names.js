var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var pg = require('pg');
var db = require('../../db');
var knex = require('knex')(db);
var bookshelf = require('bookshelf')(knex);
var Browser = require('zombie');
var fs = require('fs');

var Male = bookshelf.Model.extend({
  tableName: 'male_names'
});

/* GET home page. */
router.get('/', function(req, res) {

	knex.raw('truncate male_names').then(function(resp) {
		return;
	});

	browser = new Browser();
	browser.on('response', function(request, response) {
	    browser.response = response;
	});

	iterateMaleNames = function(i, max, rows, callback) {
		if (i > max) {
			callback();
		}
		else {
			male = new Male({name: $($(rows[i]).find('td')[0]).html()});
			male.save().then(function() {
				iterateMaleNames(i+1, max, rows, callback);
			});
		}
	}

	scrapeMaleNames = function(i) {
		if (i == 123) {
			console.log('-> Male names scraped.');
			res.end();
		}
		else {
			console.log('Scraping male names ('+String.fromCharCode(i)+')');
			browser.visit('http://www.momswhothink.com/baby-boy-names/baby-boy-names-'+String.fromCharCode(i)+'.html', {maxWait: 100, waitFor: 10}, function() {
				$ = cheerio.load(browser.html());
				rows = $('#babyname tr');
				console.log(rows.length);
				iterateMaleNames(0, rows.length-1, rows, function() {
					scrapeMaleNames(i+1);
				});
			});
		}
	}

	scrapeMaleNames(97);

});

module.exports = router;
	






