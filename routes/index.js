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
	
	connection.query("select * from questions_answers where questionnaire_id=?",[questionniareId],function(err,result){
		
		let questions = [];
		let answers = {};
		let tree = null;
		
		for(let i = 0; i < result.length; i++){
			if(!questions.includes(result[i].question)){
				questions.push(result[i].question);
			}
			console.log(answers);
			if(answers[result[i].question] == undefined){
				answers[result[i].question] = [result[i].answer];
			}else{
				answers[result[i].question].push(result[i].answer);
			}
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



router.get('/create_questions',function(req,res,next){
	
	res.render('create_questions');
	
});

router.get('/get_questionnaire_info',function(req,res,next){
	
	connection.query("select * from questionnaires",function(err,result){
		
		res.send(result);
		
	});
	
});

router.get('/edit_questions*',function(req,res,next){
	
	res.render('edit_questions',{display_name: req.query.display_name})
	
});

router.get('/get_q_and_a*',function(req,res,next){
	
	let questionniareId = req.query.id;
	
	connection.query("select * from questions_answers where questionnaire_id=?",[questionniareId],function(err,result){
		
		res.send(result);
		
	});
	
});












//POST REQUESTS
router.post('/answers',function(req,res,next){
	
	
	
});


module.exports = router;
