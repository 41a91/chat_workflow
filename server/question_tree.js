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
		let finalNode = this._nodeList[this._nodeList.length - 1];
		for(let i = 0; i < this._nodeList.length; i++){
			let node = this._nodeList[i];
			let answers = node.answers;
			
			for(let j = 0; j < answers.length; j++){
				if (this._nodeList[attachNode] != null)
				{
					node.insertNode(answers[j],this._nodeList[attachNode]);
					attachNode++;
				}
				
				// There's no more questions left in order, link the remaining to the final question in the list
				else
				{
					if (node._question != finalNode._question)
					{
						node.insertNode(answers[j],finalNode);
					}
					
					else
					{
						// You are unable to link the last question to itself or a previous question:
						// TypeError: Converting circular structure to JSON
						//attachNode = 1;
						//node.insertNode(answers[j],this._nodeList[attachNode]);
					}
				}
			}
		}
		
		this._currentNode = this._nodeList[0];
	}
	
	get currentNode()
	{
		return this._currentNode;
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
		
		get answers(){
			return this._answers;
		}
		
		insertNode(key,node){
			this._nodeList[key] = node;
		}
		
		chosenNode(key){
			return this._nodeList[key];
		}
	}

module.exports = QuestionTree;