function loadQuestionTreeAjax(questionAnswerDictionary)
{
    $.ajax({
		type: "GET",
		url: "/get_question_tree",
		success: (result) => questionTreeTest(result, questionAnswerDictionary)
	});
}

function questionTreeTest(questionTree, questionAnswerDictionary)
{
	//console.log(questionTree);
	//console.log(questionAnswerDictionary);
	
	let topNodeList = questionTree._nodeList;
	
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
						let nextNode = bottomNodeList[key];
						//console.log("Next Node: ", nextNode);
						
						questionAnswerDictionary[i].nextNode = nextNode;
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
	
	//console.log("Final q&a: ", questionAnswerDictionary);
	initializeDropdowns(questionAnswerDictionary);
	
	//dragHandler();
}




function initializeDropdowns(questionAnswerDictionary)
{
	//console.log("Questions & Answers: ", questionAnswerDictionary);
	
	divsToGiveDropdown = document.getElementsByClassName("needsDropdown");
	
	if (divsToGiveDropdown != null)
	{
		// Give each div a dropdown
		for (let i = 0; i < divsToGiveDropdown.length; i++)
		{
			let answerDisplay = divsToGiveDropdown[i].getElementsByClassName("answerDisplay"[0]);	// [0] because there will be only one input to display answers
			
			let dropdownTemplate = getDropdownTemplate(questionAnswerDictionary, answerDisplay.value);
			
			if (dropdownTemplate != null)
			{
				divsToGiveDropdown[i].appendChild(dropdownTemplate);
			}
		}
	}
}



function getDropdownTemplate(questionAnswerDictionary, displayedAnswer)
{
	let dropdown = document.createElement("select");
	
	let existingQuestions = [];
	let currentValue = -1;
	let questionToSelect = "";
	
	for (let i = 0; i < questionAnswerDictionary.length; i++)
	{
		//console.log("Current q&a: ", questionAnswerDictionary[i]);
		
		if (!existingQuestions.includes(questionAnswerDictionary[i].question))
		{
			let option = document.createElement("option");
			currentValue++;
			option.value = currentValue;
			option.innerHTML = questionAnswerDictionary[i].question;
			
			dropdown.appendChild(option);
			existingQuestions.push(questionAnswerDictionary[i].question);
		}
			
		if (questionAnswerDictionary[i].answer == displayedAnswer)
		{
			if (questionAnswerDictionary[i].nextNode != null)
			{
				questionToSelect = questionAnswerDictionary[i].nextNode._question;
			}
			else 	// On the last question, don't display an option (TEMP)
			{
				questionToSelect = null;
			}
		}
	}
	
	// Set the option that should be selected
	let options = dropdown.getElementsByTagName("option");
	
	for (let key in options)
	{
		if ($.isNumeric(key))
		{
			if (options[key].text == questionToSelect)
			{
				//dropdown.selectedIndex = options[key].value;
				options[key].selected = true;
			}
			
			else if (questionToSelect == null)
			{
				dropdown = null;
			}
		}
	}
	
	return dropdown;
}



function setSubmitButtonFunctionality()
{
	let submitButton = document.getElementById("submitButton");
	
	submitButton.onclick = function()
	{
		//let selectedOption = dropdown.options[dropdown.selectedIndex];
		//let id = selectedOption.value;
		//let displayName = selectedOption.innerHTML;
		
		//window.location.href = "https://localhost/edit_questions?" + "display_name=" + displayName + "&id=" + id;
	}
}
