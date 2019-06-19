var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.get('/',function(req, res, next){

    res.render('index',{title: 'First Init'});
});


module.exports = router;
