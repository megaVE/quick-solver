import type { Question } from "@/@types/question";
import { getRandomNumber } from "@/helpers/get-random-number";
import type { Operation } from "./operation";

function additionQuestionGenerator() {
	const firstNumber = getRandomNumber();
	const secondNumber = getRandomNumber();

	return {
		firstNumber,
		secondNumber,
		result: firstNumber + secondNumber,
	};
}
function subtractionQuestionGenerator() {
	const firstNumber = getRandomNumber({ max: 20 });
	const secondNumber = getRandomNumber({ max: firstNumber - 1 });

	return {
		firstNumber,
		secondNumber,
		result: firstNumber - secondNumber,
	};
}
function multiplicationQuestionGenerator() {
	const firstNumber = getRandomNumber();
	const secondNumber = getRandomNumber();

	return {
		firstNumber,
		secondNumber,
		result: firstNumber * secondNumber,
	};
}
function divisionQuestionGenerator() {
	const secondNumber = getRandomNumber();
	const result = getRandomNumber();

	return {
		firstNumber: result * secondNumber,
		secondNumber,
		result,
	};
}

export const OperationQuestionGeneratorMap = new Map<Operation, () => Question>(
	[
		["addition", additionQuestionGenerator],
		["subtraction", subtractionQuestionGenerator],
		["multiplication", multiplicationQuestionGenerator],
		["division", divisionQuestionGenerator],
	],
);
