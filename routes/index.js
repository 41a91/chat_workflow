/************
 * REQUIRES *
 ************/

let express = require('express');
let router = express.Router();
let mysql = require('mysql');
let QuestionTree = require('../server/question_tree.js');

// MySQL Connection
let connection = mysql.createConnection({

   host : process.env.HOST || 'localhost',
   user: process.env.USER || 'root',
   password : process.env.PASSWORD || 'root',
   database: process.env.DB || 'chat_bot'

});





/****************
 * GET REQUESTS *
 ****************/
 
/*
 * Views
 */
  
// Homepage
router.get('/',function(req, res, next){
	
    res.render('index');
	
});

// Landing Page (pass in a questionnaire id)
router.get('/landing*',function(req,res,next){
	
	try
	{
		//res.render('index',{questionnaire: 1})
		//answerList is in json format while questions are an array
		let questionniareId = req.query.id;
		console.log("ID: ", req.query.id);
		
		connection.query("select * from questions_answers where questionnaire_id=?", [questionniareId], function(err, result){
			
			let questions = [];
			let answers = {};
			let tree = null;
			
			if (result != null)
			{
				for(let i = 0; i < result.length; i++)
				{
					if(!questions.includes(result[i].question))
					{
						questions.push(result[i].question);
					}
					console.log(answers);
					
					if(answers[result[i].question] == undefined)
					{
						answers[result[i].question] = [result[i].answer];
					}
					else
					{
						answers[result[i].question].push(result[i].answer);
					}
				}
				
				// Create a new question tree
				tree = new QuestionTree(questions,answers);
				
				// Save the tree as a session letiable
				req.session.tree = tree;
				req.session.save();
				console.log(req.session.tree);
			}
			
			else
			{
				console.log("\n\nNo data from MySQL Query found in /landing* route\n\n");
			}
	
		});
		
		
	res.render('index');
	}
	
	catch (err)
	{
		console.log("failed on /landing*\n", err);
	}
	
});

// Create Questions Page
router.get('/create_questions',function(req,res,next){
	
	res.render('create_questions');
	
});

// Edit Questions Page (pass in a questionnaire display_name)
router.get('/edit_questions*',function(req,res,next){
	
	res.render('edit_questions',{display_name: req.query.display_name});
	
});

// Drag & Drop Test Page
router.get('/drag_drop',function(req, res, next){
	
    res.render('drag_drop');
	
});

// Resize Test Page
router.get('/resize',function(req, res, next){
	
    res.render('resizable');
	
});

  
  
/*
 * Ajax
 */
 
// Get Current Node
router.get('/get_current_node',function(req,res,next){
	
	// If there's a session tree, get the current node
	if (req.session.tree != null)
	{
		let currentNode = req.session.tree._currentNode;
		console.log("\n\nSuccessfully got the current node in /get_current_node:\n", currentNode);
		res.send(currentNode);
	}
	
	// If there's no session tree, send an error
	else
	{
		console.log("\n\nNo tree has been set (/get_current_node). Please visit a landing page.\n\n");
		res.send("error");
	}
	
});

// Get Question Tree
router.get('/get_question_tree',function(req,res,next){
	
	// If there's a session tree, get it
	if (req.session.tree != null)
	{
		console.log("\n\nSuccessfully got the question tree in /get_question_tree:\n", req.session.tree);
		res.send(req.session.tree);
	}
	
	// If there's no session tree, send an error
	else
	{
		console.log("\n\nNo tree has been set (/get_question_tree). Please visit a landing page.\n\n");
		res.send("error");
	}
	
});

  
  
  
/*
 * MySQL Queries
 */
 
// Get all from "questionnaires" table
router.get('/get_questionnaire_info',function(req,res,next){
	
	connection.query("select * from questionnaires",function(err,result){
			
		res.send(result);
		
	});
	
});

// Get all from "questions_answers" view at the given id
router.get('/get_q_and_a*',function(req,res,next){
	
	let questionniareId = req.query.id;
		
	connection.query("select * from questions_answers where questionnaire_id=?",[questionniareId],function(err,result){
		
		res.send(result);
		
	});
	
});



/* 
 * Miscellaneous
 */

// Session Testing
router.get('/session_test',function(req,res,next){
	
	if (req.session.tree != null)
	{
		console.log(req.session.tree);
	}
	
	else
	{
		console.log("No tree has been set. Please visit a landing page.");
	}
	
});











/*****************
 * POST REQUESTS *
 *****************/

/* 
 * Ajax
 */
 
// Set the current node
router.post('/set_current_node',function(req,res,next){
	
	if (req.body != null)
	{
		let jsonObject = JSON.parse(req.body.node);
		
		req.session.tree._currentNode = jsonObject.node;
		req.session.save();
		
		console.log("\n\nSuccessfully posted in /set_current_node:\n", req.session.tree._currentNode);
	}
	
	else
	{
		console.log("\n\nError posting in /set_current_node\n\n");
	}
	
});










// Exports
module.exports = router;
