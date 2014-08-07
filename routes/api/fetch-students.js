var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var pg = require('pg');
var db = require('../../db');
var knex = require('knex')(db);
var bookshelf = require('bookshelf')(knex);


var Student = bookshelf.Model.extend({
  tableName: 'students'
});

var Students = bookshelf.Collection.extend({
	model: Student
})


/* GET home page. */
router.get('/', function(req, res) {

	students = new Students();
	Student.fetchAll().then(function(collection) {
		// collection.forEach(function(model) {
		// 	if (model.attributes.year == 'Junior' && model.attributes.name[0] == 'A' && model.attributes.name[1] == 'b') {
		// 		students.add(model);
		// 	}
		// })

		res.send(collection);
	});	

});

module.exports = router;
