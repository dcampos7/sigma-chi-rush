var express = require('express');
var router = express.Router();

/* GET admin page. */
router.get('/', function(req, res) {
  res.render('admin', { title: 'ΣX Rush - Admin' });
});

module.exports = router;
