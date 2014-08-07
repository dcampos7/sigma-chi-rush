var express = require('express');
var cheerio = require('cheerio');
var http = require('http');
var router = express.Router();
var pg = require('pg');
var db = require('../../db');
var knex = require('knex')(db);
var bookshelf = require('bookshelf')(knex);
var Browser = require('zombie');
var fs = require('fs');

var Student = bookshelf.Model.extend({
  tableName: 'students'
});

var Male = bookshelf.Model.extend({
	tableName: 'male_names'
})

/* GET home page. */
router.post('/', function(req, res) {

	knex.raw('truncate students').then(function(resp) {
		return;
	});

	browser = new Browser();
	browser.on('response', function(request, response) {
	    browser.response = response;
	});

	years = ['Freshman', 'Sophomore', 'Junior'], num = 500, male_names = '';
	Male.fetchAll().then(function(collection) {
		male_names = new Array(collection.length);
		collection.each(function(male) {
			male_names[collection.indexOf(male)] = male.attributes.name;
		});
		console.log('Male names loaded.');
		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Freshman&concentration=&num=20&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function () {
			browser.fill('username', req.body.huid).fill('password', req.body.password).pressButton('Login', function() {
				scrapeStudents(1, num, 0);
			});
		});
	});

	iterateStudents = function(i, rows, max, photos, year, callback) {
		if (i > max) {
			callback();
		}
		else {
			console.log('Progress: '+String(parseInt(100*i/max))+'%');
			columns = $(rows[i]).children('td');
			first = $(columns[0]).text();
			student = '';
			if (male_names.indexOf(first) >= 0) {
				student = new Student({
					name: first+' '+$(columns[1]).text(),
					email: $(columns[2]).text(),
					phone: $(columns[3]).text(),
					house: $(columns[4]).text(),
					year: years[year],
					photo_id: $(columns[0]).find('a').attr('href').split('id=')[1].split('&')[0]
				})
				student.save();

				photo = 'http://facebook.college.harvard.edu/' + $(photos[i]).find('img')[0].attribs.src;
				if (photo.split('-')[1] != '0') {
					student.set({photo_exists: true});
					ext = '.' + photo.split('.')[photo.split('.').length-1];
					name = $(photos[i]).find('.photocaption a').text().replace("'", "-").split(', ');
					filename = './public/images/students/' + name[1].replace(/\ /g, '-') + '-' + name[0].replace(/\ /g, '-') + ext;
					console.log(first);
					browser.visit(photo, function() {
				        fs.writeFile(filename, browser.response.body, 'binary', function(err) {
				            if (err) throw err
				        	iterateStudents(i+1, rows, max, photos, year, callback);
				        })
				    })	
				}
				else {
					student.set({photo_exists: false});
					iterateStudents(i+1, rows, max, photos, year, callback);
				}
			}
			else {
				iterateStudents(i+1, rows, max, photos, year, callback);
			}
		}
	}

	scrapeStudents = function(start, num, year) {
		if (year > years.length-1) {
			console.log("All students scraped.");
		}
		else {
			console.log('Scraping '+years[year]+': '+String(start)+' - '+String(start+num-1));

			browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year='+years[year]+'&concentration=&start='+String(start)+'&num='+String(num)+'&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
		    	// compileImages(browser.html());
		    	$ = cheerio.load(browser.html());
		    	photos = $('.float')
		    	browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year='+years[year]+'&concentration=&start='+String(start)+'&num='+String(num)+'&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
					// compileStudents(browser.html());
					$ = cheerio.load(browser.html());
					rows = $('table#list tr').slice(1);
					iterateStudents(0, rows, rows.length-1, photos, year, function() {
						if (start+num == 2001) {
							scrapeStudents(1, num, year+1);
						}
						else {
							scrapeStudents(start+num, num, year)
						}
					});
				})
		    })
		}
	}
})

module.exports = router;
