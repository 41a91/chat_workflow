function loadCurrentNodeAjax() 
{
    $.ajax({
		type: "GET",
		url: "/get_current_node",
		success: (result) => displayCurrentNode(result)
	});
}

function displayCurrentNode(currentNode)
{
	// /get_current_node will return the string, "error", if the query fails
	
	if (currentNode != "error")
	{
		//console.log("Current Node: ", currentNode);
		
		// Post the current node to the session variable
		setCurrentNode(currentNode);
		
		let question = currentNode._question;
		let answers = currentNode._answers;
		let nodeList = currentNode._nodeList;
		
		nextMultipleChoiceQuestion(question, answers, nodeList);
	}
	
	else
	{
		displayErrorMessage();
	}
}
