function runQuestionStatus() {
    let question = "Select your status?";

    /*
     * Format:
     * "displayText": functionToRun
     */
	 /*
    let optionsDictionary = {
        "Prospective Student": runQuestionProspectiveStudent,
        "Current Student": runQuestionCurrentStudent,
        "Alumni": runQuestionAlumni,
        "Faculty": runQuestionFaculty
    }
	*/
    let optionsArray = [
        "Prospective Student", "Current Student",
        "Alumni", "Faculty"
    ]

    nextMultipleChoiceQuestion(question, optionsArray);
}
