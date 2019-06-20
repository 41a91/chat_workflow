function runQuestionAjax(question, chosenAnswer) {
	$.ajax({
	  type: "POST",
	  url: "/answers",
	  data: JSON.stringify({question: question, answer: chosenAnswer}),
	  success: () => successFunction(data),
	  dataType: "json"
	});
}

function successFunction(data)
{
	console.log("ajax successful");
	nextMultipleChoiceQuestion(data.question, data.arrayOfAnswers);
}
