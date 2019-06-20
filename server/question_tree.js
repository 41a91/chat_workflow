class QuestionTree{
	constructor(questions,answerList){
		
		this._nodeList = [];
		
		for(let i = 0; i < questions.length; i++){
			let question = questions[i];
			let answers = answerList[question];
			
			let node = new Node(question,answers);
			this._nodeList.push(node);
		}
		
		
		let attachNode = 1;
		for(let i = 0; i < this._nodeList.length; i++){
			let node = this._nodeList[i];
			let answers = node.answers;
			
			for(let j = 0; j < answers.length; j++){
				node.insertNode(answers[j],this._nodeList[attachNode]);
				attachNode++;
			}
		}
		
		this._currentNode = this._nodeList[0];
	}
	
	nextQuestion(answer){
		if(!answer){
			return this._currentNode;
		}else{
			this._currentNode = this._currentNode.chosenNode(answer);
			return this._currentNode;
		}
	}
}

class Node{
		constructor(question,answers){
			this._nodeList = {};
			this._question = question;
			this._answers = answers;
		}
		
		get question(){
			return this._question;
		}
		
		insertNode(key,node){
			this._nodeList[key] = node;
		}
		
		chosenNode(key){
			return this._nodeList[key];
		}
		
		get answers(){
			return this._answers;
		}
	}

module.exports = QuestionTree;