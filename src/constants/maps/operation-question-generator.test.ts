import { describe, expect, it } from "vitest";
import type { Question } from "@/@types/question";
import { OperationQuestionGeneratorMap } from "./operation-question-generator";

describe("Operation Question Generator", () => {
	const GENERATION_ATTEMPTS = 1000;

	it("should generate valid addition questions", () => {
		const additionQuestionGenerator = OperationQuestionGeneratorMap.get(
			"addition",
		) as () => Question;

		const randomQuestions = Array.from({ length: GENERATION_ATTEMPTS }).map(
			() => additionQuestionGenerator(),
		);

		for (const question of randomQuestions) {
			expect(question.result).toEqual(
				question.firstNumber + question.secondNumber,
			);
		}
	});

	it("should generate valid subtraction questions", () => {
		const subtractionQuestionGenerator = OperationQuestionGeneratorMap.get(
			"subtraction",
		) as () => Question;

		const randomQuestions = Array.from({ length: GENERATION_ATTEMPTS }).map(
			() => subtractionQuestionGenerator(),
		);

		for (const question of randomQuestions) {
			expect(question.result).toEqual(
				question.firstNumber - question.secondNumber,
			);
		}
	});

	it("should generate valid multiplication questions", () => {
		const multiplicationQuestionGenerator = OperationQuestionGeneratorMap.get(
			"multiplication",
		) as () => Question;

		const randomQuestions = Array.from({ length: GENERATION_ATTEMPTS }).map(
			() => multiplicationQuestionGenerator(),
		);

		for (const question of randomQuestions) {
			expect(question.result).toEqual(
				question.firstNumber * question.secondNumber,
			);
		}
	});

	it("should generate valid division questions", () => {
		const divisionQuestionGenerator = OperationQuestionGeneratorMap.get(
			"division",
		) as () => Question;

		const randomQuestions = Array.from({ length: GENERATION_ATTEMPTS }).map(
			() => divisionQuestionGenerator(),
		);

		for (const question of randomQuestions) {
			expect(question.result).toEqual(
				question.firstNumber / question.secondNumber,
			);
		}
	});
});
