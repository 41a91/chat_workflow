/*
 * On load
 */
window.onload = runBot();

// Track the next node
this.nextNode = null;



function runBot() 
{
    // Get the current question
	loadCurrentNodeAjax();
}


function displayQuestion(chatElement, questionText, arrayOfAnswers) 
{
    // Create a div to hold the question
    let questionDiv = document.createElement("div");
    questionDiv.className = "questionDiv";  // For CSS
    questionDiv.id = "currentQuestion";     // For optimization in endClickEvent()

    // Add the div to the chatElement
    chatElement.appendChild(questionDiv);


    // Create a <p> to hold the question text
    let questionTextElement = document.createElement("p");
    questionTextElement.className = "questionText";   // For CSS
    questionTextElement.innerHTML = questionText;     // Display text

    // Add the div to the questionDiv
    questionDiv.appendChild(questionTextElement);

    // Display the given options
    displayOptions(questionDiv, questionText, arrayOfAnswers);

    // Scroll to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
}


function displayOptions(questionDiv, questionText, arrayOfAnswers) 
{
    setAnswersClickFunctionality(questionDiv, questionText, arrayOfAnswers);
}


function setAnswersClickFunctionality(questionDiv, questionText, arrayOfAnswers) 
{
    for (let i = 0; i < arrayOfAnswers.length; i++) 
	{
        let answerText = displayChoice(questionText, arrayOfAnswers[i]);
        questionDiv.appendChild(answerText);
    }
}


function displayChoice(questionText, answerText) 
{
    // Create a <p> to hold the option text
    let displayText = document.createElement("p");
    displayText.className = "questionOption";   // For CSS
    displayText.innerHTML = answerText;         // Display text

    // Click event listener
    displayText.onclick = () => runOption(answerText);

    return displayText;
}

function getFormTextInputOption(optionText, placeholderText) 
{
    // Create a <p> to hold the option text
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholderText;

    input.className = "inputField";       // For CSS
    input.innerHTML = optionText;         // Display text

    return input;
}


function endClickEvent() 
{
    if (document.getElementById("currentQuestion") != null) {
        let currentDiv = document.getElementById("currentQuestion");

        // Remove each child's click functionality
        for (let i = 0; i < currentDiv.children.length; i++) {
            currentDiv.children[i].onclick = null;
        }

        // Remove "currentQuestion" id
        currentDiv.removeAttribute("id");
    }
}


function runOption(answerText) 
{
	// Display the node with the given answer as its key
	displayCurrentNode(this.nextNode[answerText]);
    endClickEvent();
}



function nextMultipleChoiceQuestion(questionText, arrayOfAnswers, nextNodelist) 
{
    let chat = document.getElementById("chat");
	
	this.nextNode = nextNodelist;

    displayQuestion(chat, questionText, arrayOfAnswers);
}

function displayErrorMessage() 
{
    let chat = document.getElementById("chat");
	
	// Create a <p> to hold the error text
    let errorTextElement = document.createElement("p");
    errorTextElement.className = "errorText";   								// For CSS
    errorTextElement.innerHTML = "There was an error loading your question";	// Display text

    // Add the div to the chat
    chat.appendChild(errorTextElement);
}
