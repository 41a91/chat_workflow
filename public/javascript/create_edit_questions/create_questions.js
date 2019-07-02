/*
 * On Load
 */
window.onload = function()
{
	preventPageRefresh();
	initializeForm(1);
	getDropdownAjax();	// create_dropdown.js
}

function preventPageRefresh()
{
	$("form").on("submit", function(e)
	{
		e.preventDefault();
	});
}

function initializeForm(numOfQuestions)
{
	let questionsDiv = document.getElementById("questionsDiv");
	questionsDiv.numberOfQuestions = 0;
	
	addQuestionToForm(numOfQuestions, questionsDiv);
}



function addQuestionToForm(numOfQuestions, questionsDiv)
{
	for (let i = 0; i < numOfQuestions; i++)
	{
		let newQuestionDiv = getQuestionDiv(questionsDiv);
	
		questionsDiv.appendChild(newQuestionDiv);
	}
}

function getQuestionDiv(parentQuestionsDiv)
{
	let questionDiv = document.createElement("div");
	
	parentQuestionsDiv.numberOfQuestions++;
	
	questionDiv.appendChild(getQuestionLabel(parentQuestionsDiv.numberOfQuestions));
	questionDiv.appendChild(getInputField("Enter your question"));
	questionDiv.appendChild(getButton("addQuestion", questionDiv, null));
	questionDiv.appendChild(getButton("removeQuestion", questionDiv, null));
	questionDiv.appendChild(document.createElement("BR"));
	
	let answersDiv = document.createElement("div");
	answersDiv.id = "answersDiv" + parentQuestionsDiv.numberOfQuestions;
	
	answersDiv.numberOfAnswers = 0;
	addAnswerField(answersDiv);
	addAnswerField(answersDiv);
	
	questionDiv.appendChild(answersDiv);
	questionDiv.appendChild(document.createElement("BR"));
	
	return questionDiv;
}

function addAnswerField(div)
{
	div.numberOfAnswers++;
	div.appendChild(getAnswerField(div));
}

function getAnswerField(answersDiv)
{
	let answerDiv = document.createElement("div");
	
	answerDiv.appendChild(getInputField("Enter an answer"));
	answerDiv.appendChild(getButton("addAnswer", answerDiv, answersDiv));
	answerDiv.appendChild(getButton("removeAnswer", answerDiv, answersDiv));
	
	return answerDiv;
}

function getQuestionLabel(questionNumber)
{
	let questionLabel = document.createTextNode("Question" + ": ");
	
	return questionLabel;
}

function getInputField(placeholderText)
{
	let inputField = document.createElement("input");
	inputField.type = "text";
	inputField.placeholder = placeholderText;
	
	return inputField;
}

function getButton(className, div, parentDiv)
{
	let button = document.createElement("button");
	button.className = className;
	
	if (className == "addQuestion" || className == "addAnswer")
	{
		button.innerHTML = "+";
	}
	else if (className == "removeQuestion" || className == "removeAnswer")
	{
		button.innerHTML = "-";
	}
	
	if (className == "addQuestion" || className == "removeQuestion" || className == "removeAnswer")
	{
		addClickFunctionality(button, div);
	}
	
	else if (className == "addAnswer")
	{
		addClickFunctionality(button, parentDiv);
	}
	
	return button;
}



function removeElementFromForm(element, className)
{
	if (className === "removeAnswer")
	{
		element.parentNode.numberOfAnswers--;
		
		// There are no answers remaining
		if (element.parentNode.numberOfAnswers < 1)
		{
			addAnswerField(element.parentNode)
		}
	}
	
    element.parentNode.removeChild(element);
	
	if (className === "removeQuestion")
	{
		let questionsDiv = document.getElementById("questionsDiv");
		questionsDiv.numberOfQuestions--;
		
		if (questionsDiv.numberOfQuestions == 0)
		{
			addQuestionToForm(1, questionsDiv);
		}
	}
}



function addClickFunctionality(element, div)
{	
	if (element.className == "addQuestion")
	{
		let questionsDiv = document.getElementById("questionsDiv");
		element.onclick = () => addQuestionToForm(1, questionsDiv);
	}
	
	else if (element.className == "removeQuestion" || element.className == "removeAnswer")
	{
		element.onclick = () => removeElementFromForm(div, element.className);
	}
	
	else if (element.className == "addAnswer")
	{
		element.onclick = () => addAnswerField(div);
	}
}
