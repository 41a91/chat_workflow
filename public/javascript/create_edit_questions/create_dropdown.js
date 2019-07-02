function getDropdownAjax()
{
	$.ajax({
		type: "GET",
		url: "/get_questionnaire_info",
		success: (result) => initializeDropdown(result)
	});
}

function initializeDropdown(questionnaireDict)
{
	let dropdown = document.getElementById("questionnaireDropdown");
	
	for (let key in questionnaireDict)
	{
		let option = document.createElement("option");
		option.value = questionnaireDict[key].id;
		option.innerHTML = questionnaireDict[key].display_name;
		
		dropdown.appendChild(option);
	}
	
	 setNextButtonFunctionality(dropdown);
}





function setNextButtonFunctionality(dropdown)
{
	let nextButton = document.getElementById("nextButton");
	
	nextButton.onclick = function()
	{
		try
		{
			let selectedOption = dropdown.options[dropdown.selectedIndex];
			let id = selectedOption.value;
			let displayName = selectedOption.innerHTML;
			
			window.location.href = "https://localhost/edit_questions?" + "display_name=" + displayName + "&id=" + id;
		}
		
		catch (err)
		{
			console.log(err);
		}
	}
}
