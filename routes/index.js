var express = require('express');
const User = require('../model/user');
const otherUser = require('../other/user');
const Midtoken = require('../middlewares/token');

var router = express.Router();


/* GET home page. */
router.get('/index', function(req, res, next) {
 
  res.render('index', { title: 'Express'});
  
});

module.exports = router;
