function initializeDropdowns(questionAnswerDictionary)
{
	//console.log(questionAnswerDictionary);
	let dropdownTemplate = getDropdownTemplate(questionAnswerDictionary);
	console.log(dropdownTemplate.options);
	let optionArray = [];
	for (let i = 0; i < dropdownTemplate.options.length; i++)
	{
		if (isNode(dropdownTemplate.options[i]) || isElement(dropdownTemplate.options[i]))
		{
			let opt = dropdownTemplate.options[i];
			optionArray.push(opt);
		}
	}
	
	let allDropdowns = document.getElementsByClassName("questionDropdown");
	let dropdownArray = [];
	for (let i = 0; i < allDropdowns.length; i++)
	{
		if (isNode(allDropdowns[i]) || isElement(allDropdowns[i]))
		{
			let dropdown = allDropdowns[i];
			dropdownArray.push(dropdown);
		}
	}
	
	
	
	
	for (let i = 0; i < dropdownArray.length; i++)
	{
		if (isNode(dropdownArray[i]) || isElement(dropdownArray[i]))
		{			
			for (let j = 0; j < optionArray.length; j++)
			{
				if (isNode(optionArray[j]) || isElement(optionArray[j]))
				{
					let opt = optionArray[j];
					console.log("Opt: ", opt);
					console.log("i: ", i);
					console.log("j: ", j);
					dropdownArray[i].add(opt);
					//console.log(dropdownTemplate.options[optionKey]);
				}
			}
		}
	}
	/*
	let dropdown = document.getElementById("questionnaireDropdown");
	
	for (let key in questionnaireDict)
	{
		let option = document.createElement("option");
		option.value = questionnaireDict[key].id;
		option.innerHTML = questionnaireDict[key].display_name;
		
		dropdown.appendChild(option);
	}
	
	 setNextButtonFunctionality(dropdown);
	 */
}



function getDropdownTemplate(questionAnswerDictionary)
{
	let dropdown = document.createElement("select");
	
	let existingQuestions = [];
	
	for (let i = 0; i < questionAnswerDictionary.length; i++)
	{
		if (!existingQuestions.includes(questionAnswerDictionary[i].question))
		{
			let option = document.createElement("option");
			option.value = i;
			option.innerHTML = questionAnswerDictionary[i].question;
			
			dropdown.appendChild(option);
			existingQuestions.push(questionAnswerDictionary[i].question);
		}
	}
	
	return dropdown;
}

//Returns true if it is a DOM node
function isNode(o)
{
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}

//Returns true if it is a DOM element    
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
)
}





function setNextButtonFunctionality(dropdown)
{
	let nextButton = document.getElementById("nextButton");
	
	nextButton.onclick = function()
	{
		let selectedOption = dropdown.options[dropdown.selectedIndex];
		let id = selectedOption.value;
		let displayName = selectedOption.innerHTML;
		
		window.location.href = "https://localhost/edit_questions?" + "display_name=" + displayName + "&id=" + id;
	}
}
