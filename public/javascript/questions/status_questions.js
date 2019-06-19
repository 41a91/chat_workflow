function runQuestionStatus() {
    let question = "Select your status?";

    /*
     * Format:
     * "displayText": functionToRun
     */
    let optionsDictionary = {
        "Prospective Student": runQuestionProspectiveStudent,
        "Current Student": runQuestionCurrentStudent,
        "Alumni": runQuestionAlumni,
        "Faculty": runQuestionFaculty
    }

    nextMultipleChoiceQuestion(question, optionsDictionary);
}
