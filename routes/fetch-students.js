var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var pg = require('pg');
var db = require('../db');
var knex = require('knex')(db);
var bookshelf = require('bookshelf')(knex);


var Student = bookshelf.Model.extend({
  tableName: 'students'
});

/* GET home page. */
router.get('/', function(req, res) {

	Student.fetchAll().then(function(collection) {
		res.send(collection);
	});	

});

module.exports = router;
