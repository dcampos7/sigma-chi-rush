var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var pg = require('pg');
var db = require('../db');
var knex = require('knex')(db);
var bookshelf = require('bookshelf')(knex);
var Browser = require('zombie');
var fs = require('fs');

var Student = bookshelf.Model.extend({
  tableName: 'students'
});

/* GET home page. */
router.post('/', function(req, res) {

	knex.raw('truncate students').then(function(resp) {
		return;
	});

	browser = new Browser();
	browser.on('response', function(request, response) {
	    browser.response = response;
	});

	removeGirls = function(i, rows) {

		if (i == rows.length) {
			console.log("Girls removed.");
			return;
		}

		tr = rows[i];
		columns = $(tr).children('td')
		first = $(columns[0]).text();
		last = $(columns[1]).text();
		email = $(columns[2]).text();
		phone = $(columns[3]).text();
		house = $(columns[4]).text();
		year = $(columns[5]).text();

		console.log(first);

		if (boys.indexOf(first) >= 0) {
			student = new Student({name: first + ' ' + last, email: email, phone: phone, house: house, year: year});
			student.save();
			removeGirls(i+1, rows);
			return;
		}
		else if (girls.indexOf(first) >= 0) {
			removeGirls(i+1, rows);
			return;
		}
		else {
			browser.visit('http://www.namepedia.org/en/firstname/'+first, function() {
				np = cheerio.load(browser.html());
				if (np('#gender').length > 0) {
					gender = $(np('#gender')[0]).text()
					if (gender.trim() == 'Female') {
						girls.push(first);
						removeGirls(i+1, rows);
						return;
					}
					else {
						student = new Student({name: first + ' ' + last, email: email, phone: phone, house: house, year: year});
						student.save();
						boys.push(first);
						removeGirls(i+1, rows);
						return;
					}
				}
				else {
					sex = {male: 0, female: 0};
					np('.content a').each(function(i, d) {
						content = $(d).text();
						if (content.indexOf('Male') >= 0) {
							sex.male += 1;
						}
						else if (content.indexOf('Female') >= 0) {
							sex.female += 1;
						}
					});
					if (sex.female > 0 && sex.male == 0) {
						girls.push(first);
						removeGirls(i+1, rows);
						return;
					}
					else {
						student = new Student({name: first + ' ' + last, email: email, phone: phone, house: house, year: year});
						student.save();
						boys.push(first);
						removeGirls(i+1, rows);
						return;
					}
				}
			});
		}
	}

	var students = [], girls = [], boys = [];
	compileStudents = function(html) {
		$ = cheerio.load(html);
		removeGirls(0, $('table#list tr').slice(1, $('table#list tr').length));
	}

	grabImage = function(i, blocks) {

		if (i == blocks.length) {
			console.log('Student images saved.');
			return;
		} 

		d = blocks[i];
		picture = 'http://facebook.college.harvard.edu/' + $(d).find('img')[0].attribs.src;
		ext = '.' + picture.split('.')[picture.split('.').length-1];
		if (picture.split('-')[1] != '0') {
			browser.visit(picture, function() {
				name = $(d).find('.photocaption a').text().split(', ');
				filename = name[1] + '-' + name[0] + ext;
				fs.writeFile('./public/images/students/'+filename, browser.response.body, 'binary', function(err) {
		            if (err) throw err
		            console.log('File saved.')
		        	grabImage(i+1, blocks);
		        	return;
		        })
			})
		}
		else {
			grabImage(i+1, blocks);
			return;
		}
	}

	compileImages = function(html) {
		$ = cheerio.load(html);
		grabImage(0, $('.float'));			
	}

	browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Freshman&concentration=&num=20&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function () {

	  browser.
	    fill('username', req.body.huid).
	    fill('password', req.body.password).
	    pressButton('Login', function() {

	    	browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=1&num=10&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
	    		compileStudents(browser.html());
	    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=1&num=30&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
		    		compileImages(browser.html());
		    		
		    		// console.log(browser.html());
		    		// browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Freshman&concentration=&start=501&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
			    	// 	console.log(browser.html());
			    	// 	browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Freshman&concentration=&start=1001&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
				    // 		console.log(browser.html());
				    // 		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Freshman&concentration=&start=1501&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
					   //  		console.log(browser.html());
					   //  		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Sophomore&concentration=&start=1&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
						  //   		console.log(browser.html());
						  //   		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Sophomore&concentration=&start=501&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
							 //    		console.log(browser.html());
							 //    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Sophomore&concentration=&start=1001&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
								//     		console.log(browser.html());
								//     		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Sophomore&concentration=&start=1501&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
								// 	    		console.log(browser.html());
								// 	    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=1&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
								// 		    		console.log(browser.html());
								// 		    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=501&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
								// 			    		console.log(browser.html());
								// 			    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=1001&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
								// 				    		console.log(browser.html());
								// 				    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=1501&num=500&Search=Search&view=photo', {maxWait: 100, waitFor: 10}, function() {
								// 					    		console.log(browser.html());
																res.end();
								// 					    	});
								// 				    	});
								// 			    	});
								// 		    	});
								// 	    	});
								//     	});
							 //    	});
						  //   	});
					   //  	});
				    // 	});
			    	// });
		    	});
	    		
	    		// console.log(browser.html());
	    		// browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Freshman&concentration=&start=501&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
		    	// 	console.log(browser.html());
		    	// 	browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Freshman&concentration=&start=1001&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
			    // 		console.log(browser.html());
			    // 		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Freshman&concentration=&start=1501&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
				   //  		console.log(browser.html());
				   //  		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Sophomore&concentration=&start=1&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
					  //   		console.log(browser.html());
					  //   		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Sophomore&concentration=&start=501&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
						 //    		console.log(browser.html());
						 //    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Sophomore&concentration=&start=1001&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
							//     		console.log(browser.html());
							//     		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Sophomore&concentration=&start=1501&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
							// 	    		console.log(browser.html());
							// 	    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=1&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
							// 		    		console.log(browser.html());
							// 		    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=501&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
							// 			    		console.log(browser.html());
							// 			    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=1001&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
							// 				    		console.log(browser.html());
							// 				    		browser.visit('http://facebook.college.harvard.edu/search?name_last=&name_first=&house=&assigned_house=&year=Junior&concentration=&start=1501&num=500&Search=Search&view=list', {maxWait: 100, waitFor: 10}, function() {
							// 					    		console.log(browser.html());
															res.end();
							// 					    	});
							// 				    	});
							// 			    	});
							// 		    	});
							// 	    	});
							//     	});
						 //    	});
					  //   	});
				   //  	});
			    // 	});
		    	// });
	    	});

			
	    });
	});
});

module.exports = router;
