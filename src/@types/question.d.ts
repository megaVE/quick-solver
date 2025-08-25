export interface Question {
	firstNumber: number;
	secondNumber: number;
	result: number;
}

export interface QuestionWithFeedback extends Question {
	feedback: boolean | null;
}
