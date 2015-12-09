var express = require('express');
var router = express.Router();
var app = express();
var config = require('../database/config.json')[app.get('env')];

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Online Photo Print',apiContext: config.apiContext });
});

module.exports = router;
