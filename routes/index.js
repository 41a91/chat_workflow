var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var QuestionTree = require('../server/question_tree.js');

var connection = mysql.createConnection({

   host : process.env.HOST || 'localhost',
   user: process.env.USER || 'root',
   password : process.env.PASSWORD || 'root',
   database: process.env.DB || 'chat_bot'

});


router.get('/',function(req, res, next){

    res.render('index');
});

router.get('/landing*',function(req,res,next){
	
	//res.render('index',{questionnaire: 1})
	//answerList is in json format while questions are an array
	let questionniareId = req.query.id;
	console.log(req.query.id);
	
	connection.query("select * from questions_answers where id=?",[questionniareId],function(err,result){
		
		let questions = [];
		let answers = {};
		let tree = null;
		
		for(let i = 0; i < result.length; i++){
			questions.push(result[i].question);
			answers[questions[i]] = result[i].answer;
			//answers is undefined 
		}
		
		tree = new QuestionTree(questions,answers);
		req.session.tree = tree;
		req.session.save();
		console.log(req.session.tree);
		
	});
	
	res.render('index');
	
});

router.get('/session_test',function(req,res,next){
	
	console.log(req.session.tree);
	
});












//POST REQUESTS
router.post('/answers',function(req,res,next){
	
	
	
});


module.exports = router;
