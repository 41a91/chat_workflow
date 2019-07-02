/*
 * On Load
 */
window.onload = function()
{
	preventPageRefresh();
	
	let queryString = new URLSearchParams(window.location.search);
	
	let id = queryString.get("id");
	getDropdownAjax(id);
}

function preventPageRefresh()
{
	$("form").on("submit", function(e)
	{
		e.preventDefault();
	});
}

function getDropdownAjax(questionnaireId)
{
	$.ajax({
		type: "GET",
		url: "/get_q_and_a" + "?id=" + questionnaireId,
		success: (result) => initializePage(result)
	});
}



function initializePage(questionAnswerDictionary)
{
	loadQuestionTreeAjax(questionAnswerDictionary);
}



function initializeForm(questionAnswerDictionary)
{
	let questionsDiv = document.getElementById("questionsDiv");
	
	let currentQuestionId = -1;
	let currentQuestionDiv = null;
	let answersDiv = null;
	
	//let currentQuestionsSpan = null;
	//let nextSpanQuestions = questionAnswerDictionary[0].question;
	
	
	for (let key in questionAnswerDictionary)
	{
		// Move on to the next question
		if (questionAnswerDictionary[key].question_id > currentQuestionId)
		{
			currentQuestionId = questionAnswerDictionary[key].question_id;
			
			// It's not the first question
			if (currentQuestionDiv != null)
			{
				currentQuestionDiv.appendChild(document.createElement("BR"));
			}
			
			// Create a question field
			currentQuestionDiv = addQuestionToForm( questionAnswerDictionary[key].question, (currentQuestionId - 1), questionAnswerDictionary[key] );
			
			// Create a div to hold the new answers
			answersDiv = document.createElement("div");
			answersDiv.className = "answersDiv";
		}
		
		// Add answer field to the current question div
		getAnswerDiv(currentQuestionDiv, answersDiv, questionAnswerDictionary[key].answer, questionAnswerDictionary[key].nextNode);
		
		// 
		//currentQuestionsSpan.appendChild(currentQuestionDiv);
	}
}



function addQuestionToForm(valueText, questionId, currentNode)
{
	let questionsDiv = document.getElementById("questionsDiv");
	
	let newQuestionDiv = getQuestionDiv(valueText, questionId, currentNode);
	questionsDiv.appendChild(newQuestionDiv);
	
	return newQuestionDiv;
}

function getQuestionDiv(valueText, questionId, currentNode)
{
	let questionDiv = document.createElement("div");
	questionDiv.display = "inline";
	
	if (currentNode.previousNode != null)
	{
		let previousNode = currentNode.previousNode;
		let labelString = "Comes From:<br />" + previousNode.question + "<br />" + previousNode.answer;
		questionDiv.appendChild(getLabel(labelString, "linkedQuestion"));
	}
	
	questionDiv.appendChild(getLabel(valueText, null));
	
	// Enable dragging
	questionDiv.className = "draggable";
	questionDiv.draggable = true;
	questionDiv.id = questionId;
	
	return questionDiv;
}

function getAnswerDiv(questionDiv, answersDiv, valueText, nextNode)
{
	//let answersDiv = document.createElement("div");
	
	addAnswerField(answersDiv, valueText, nextNode);
	
	questionDiv.appendChild(answersDiv);
}

function addAnswerField(answersDiv, valueText, nextNode)
{
	answersDiv.appendChild(getAnswerField(answersDiv, valueText, nextNode));
}

function getAnswerField(answersDiv, valueText, nextNode)
{
	let answerDiv = document.createElement("div");
	answerDiv.className = "needsDropdown";
	
	answerDiv.appendChild(getInputField(valueText, 5));
	
	if (nextNode != null)
	{
		let question = nextNode._question;
		answerDiv.appendChild(getInputField(question, 30));
	}
	
	return answerDiv;
}

function getLabel(displayText, className)
{
	let label = document.createElement("p");
	label.innerHTML = displayText;
	
	if (className != null)
	{
		label.className = className;
	}
	
	return label;
}

function getInputField(valueText, size)
{
	let inputField = document.createElement("input");
	inputField.type = "text";
	inputField.value = valueText;
	inputField.className = "answerDisplay";
	inputField.readOnly = true;
	inputField.size = size;
	
	return inputField;
}

function getSpanElement()
{
	let span = document.createElement("span");
	span.className = "droppable";
	//span.className = "questionsSpan";
	
	return span;
}



function loadQuestionTreeAjax(questionAnswerDictionary)
{
    $.ajax({
		type: "GET",
		url: "/get_question_tree",
		success: (result) => decodeQuestionTree(result, questionAnswerDictionary)
	});
}

function decodeQuestionTree(questionTree, questionAnswerDictionary)
{
	//console.log("Tree: ", questionTree);
	//console.log(questionAnswerDictionary);
	
	let topNodeList = questionTree._nodeList;
				
				//DELETETHIS
				let previousNodeDict = {};
	
	// Loop over each question
	for (let i = 0; i < questionAnswerDictionary.length; i++)
	{
		//console.log("Current question: ", questionAnswerDictionary[i]);
		
		// Loop over each top level Node
		for (let topNl = 0; topNl < topNodeList.length; topNl++)
		{
			//console.log(topNodeList[topNl]);
			let shouldBreak = false;
			
			// The current q&a question matches the current top level node question
			if (questionAnswerDictionary[i].question == topNodeList[topNl]._question)
			{
				let bottomNodeList = topNodeList[topNl]._nodeList;
				
				// Loop over each answer to get the question/node it is linked to
				for (let key in bottomNodeList)
				{
					// The current q&a answer matches the key (answer) which links to the question the answer should link to
					if (questionAnswerDictionary[i].answer == key)
					{
						let currentNode = questionAnswerDictionary[i];
						let nextNode = bottomNodeList[key];
						//console.log("Current Node: ", currentNode);
						//console.log("Next Node: ", nextNode);
						
						//nextNode.previousNode = currentNode;
						questionAnswerDictionary[i].nextNode = nextNode;
						
						// The list of previous nodes is not empty
						if (!jQuery.isEmptyObject(previousNodeDict))
						{
							for (let key in previousNodeDict)
							{
								// The current node's question matches a previous node's answer
								if (currentNode.question == key)
								{
									questionAnswerDictionary[i].previousNode = previousNodeDict[key];
								}
								
								// There's no matching previous node
								else
								{
									previousNodeDict[nextNode._question] = currentNode;
								}
							}
						}
						// The list of previous nodes is empty
						else
						{
							previousNodeDict[currentNode.question] = null;
							questionAnswerDictionary[i].previousNode = null;
							
							previousNodeDict[nextNode._question] = currentNode;
							//console.log("Previous Node: ", previousNodeDict[nextNode._question]);
						}
						
						shouldBreak = true;
						break;
					}
				}
				
				// End loop for top level node list
				if (shouldBreak)
				{
					break;
				}
			}
		}
	}
	
	console.log("Final q&a: ", questionAnswerDictionary);
	initializeForm(questionAnswerDictionary);
}
