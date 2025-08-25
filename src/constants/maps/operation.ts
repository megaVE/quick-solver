import type { Question } from "@/@types/question";
import type { Score } from "@/@types/score";
import { getRandomNumber } from "@/helpers/get-random-number";

export type Operation =
	| "addition"
	| "subtraction"
	| "multiplication"
	| "division";

export const OperationMap = new Map<Operation, string>([
	["addition", "Adição"],
	["subtraction", "Subtração"],
	["multiplication", "Multiplicação"],
	["division", "Divisão"],
]);

export const OperationIconMap = new Map<Operation, string>([
	["addition", "+"],
	["subtraction", "–"],
	["multiplication", "×"],
	["division", "÷"],
]);

export const OperationQuestionGeneratorMap = new Map<Operation, () => Question>(
	[
		[
			"addition",
			() => {
				const firstNumber = getRandomNumber();
				const secondNumber = getRandomNumber();

				return {
					firstNumber,
					secondNumber,
					result: firstNumber + secondNumber,
				};
			},
		],
		[
			"subtraction",
			() => {
				const firstNumber = getRandomNumber({ max: 20 });
				const secondNumber = getRandomNumber({ max: firstNumber - 1 });

				return {
					firstNumber,
					secondNumber,
					result: firstNumber - secondNumber,
				};
			},
		],
		[
			"multiplication",
			() => {
				const firstNumber = getRandomNumber();
				const secondNumber = getRandomNumber();

				return {
					firstNumber,
					secondNumber,
					result: firstNumber * secondNumber,
				};
			},
		],
		[
			"division",
			() => {
				const secondNumber = getRandomNumber();
				const result = getRandomNumber();

				return {
					firstNumber: result * secondNumber,
					secondNumber,
					result,
				};
			},
		],
	],
);

export const OperationScoreMap = new Map<Operation, Score[]>([
	[
		"addition",
		[
			{ time: 180, rate: "weak" },
			{ time: 120, rate: "ok" },
			{ time: 90, rate: "good" },
			{ time: 60, rate: "very-good" },
		],
	],
	[
		"subtraction",
		[
			{ time: 180, rate: "weak" },
			{ time: 120, rate: "ok" },
			{ time: 90, rate: "good" },
			{ time: 60, rate: "very-good" },
		],
	],
	[
		"multiplication",
		[
			{ time: 120, rate: "weak" },
			{ time: 90, rate: "ok" },
			{ time: 60, rate: "good" },
			{ time: 30, rate: "very-good" },
		],
	],
	[
		"division",
		[
			{ time: 180, rate: "weak" },
			{ time: 120, rate: "ok" },
			{ time: 90, rate: "good" },
			{ time: 60, rate: "very-good" },
		],
	],
]);
