var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var pg = require('pg');
var db = require('../db');
var knex = require('knex')(db);
var bookshelf = require('bookshelf')(knex);


var Active = bookshelf.Model.extend({
  tableName: 'actives'
});

/* GET home page. */
router.get('/', function(req, res) {

	knex.raw('truncate actives').then(function(resp) {
		return;
	});

	request('http://www.harvardsigmachi.com/brothers/', function(error, response, body) {
		
		$ = cheerio.load(body);

		$('tr').slice(1, $('tr').length).each(function(i, tr) {
			columns = $(tr).children('td')
			name = $(columns[0]).text();
			hometown = $(columns[3]).text();

			active = new Active({name: name, hometown: hometown});
			active.save()
		});

	});

	res.end();

});

module.exports = router;
