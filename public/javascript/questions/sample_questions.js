function runQuestionColors()
{
    let question = "What is your favorite color?";

    /*
     * Format:
     * "displayText": functionToRun
     */
    let optionsDictionary = {
        "Blue": runQuestionFood,
        "Red": runQuestionPlatform
    }

    nextQuestion(question, optionsDictionary);
}


function runQuestionFood()
{
    let question = "What is your favorite food?";

    /*
     * Format:
     * "displayText": functionToRun
     */
    let optionsDictionary = {
        "Pizza": runQuestionAnimal,
        "Spaghetti": runQuestionGame,
        "Burgers": runQuestionPlatform,
        "Chicken": runQuestionCarCompany
    }

    nextQuestion(question, optionsDictionary);
}


function runQuestionPlatform()
{
    let question = "What is your favorite platform?";

    /*
     * Format:
     * "displayText": functionToRun
     */
    let optionsDictionary = {
        "Mount Roar": runQuestionCarCompany,
        "AllTogether": runQuestionAnimal,
        "Cicada Safari": runQuestionColors
    }

    nextQuestion(question, optionsDictionary);
}


function runQuestionCarCompany()
{
    let question = "What is your favorite car company?";

    /*
     * Format:
     * "displayText": functionToRun
     */
    let optionsDictionary = {
        "Toyota": runQuestionPlatform,
        "Ford": runQuestionFood,
        "Honda": runQuestionColors,
        "Jeep": runQuestionAnimal,
        "Lamborghini": runQuestionGame
    }

    nextQuestion(question, optionsDictionary);
}


function runQuestionGame()
{
    let question = "What is your favorite game?";

    /*
     * Format:
     * "displayText": functionToRun
     */
    let optionsDictionary = {
        "Pac-Man": runQuestionFood,
        "Galaga": runQuestionCarCompany,
        "Dig Dug": runQuestionColors
    }

    nextQuestion(question, optionsDictionary);
}


function runQuestionAnimal()
{
    let question = "What is your favorite animal?";

    /*
     * Format:
     * "displayText": functionToRun
     */
    let optionsDictionary = {
        "Dog": runQuestionCarCompany,
        "Cat": runQuestionGame,
        "I hate animals": runQuestionPlatform
    }

    nextQuestion(question, optionsDictionary);
}
