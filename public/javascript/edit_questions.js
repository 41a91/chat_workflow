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
	initializeForm(questionAnswerDictionary);
	initializeDropdowns(questionAnswerDictionary);
}



function initializeForm(questionAnswerDictionary)
{	
	let currentQuestionId = -1;
	let currentQuestionDiv = null;
	let answersDiv = null;
	
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
			currentQuestionDiv = addQuestionToForm(questionAnswerDictionary[key].question);
			
			// Create a div to hold the new answers
			answersDiv = document.createElement("div");
		}
		
		// Add answer field to the current question div
		getAnswerDiv(currentQuestionDiv, answersDiv, questionAnswerDictionary[key].answer);
	}
}



function addQuestionToForm(valueText)
{
	let questionsDiv = document.getElementById("questionsDiv");
	
	let newQuestionDiv = getQuestionDiv(questionsDiv, valueText);
	questionsDiv.appendChild(newQuestionDiv);
	
	return newQuestionDiv;
}

function getQuestionDiv(parentQuestionsDiv, valueText)
{
	let questionDiv = document.createElement("div");
	
	questionDiv.appendChild(getQuestionLabel());
	questionDiv.appendChild(getInputField(valueText));
	questionDiv.appendChild(getDropdownElement());
	
	return questionDiv;
}

function getDropdownElement()
{
	let dropdown = document.createElement("select");
	dropdown.className = "questionDropdown";
	
	return dropdown;
}

function getAnswerDiv(questionDiv, answersDiv, valueText)
{
	//let answersDiv = document.createElement("div");
	
	addAnswerField(answersDiv, valueText);
	
	questionDiv.appendChild(answersDiv);
}

function addAnswerField(answersDiv, valueText)
{
	answersDiv.appendChild(getAnswerField(answersDiv, valueText));
}

function getAnswerField(answersDiv, valueText)
{
	let answerDiv = document.createElement("div");
	
	answerDiv.appendChild(getInputField(valueText));
	
	return answerDiv;
}

function getQuestionLabel()
{
	let questionLabel = document.createTextNode("Question" + ": ");
	
	return questionLabel;
}

function getInputField(valueText)
{
	let inputField = document.createElement("input");
	inputField.type = "text";
	inputField.value = valueText;
	inputField.readOnly = true;
	
	return inputField;
}
