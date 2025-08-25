import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { type KeyboardEvent, useEffect, useMemo, useState } from "react";
import type { QuestionWithFeedback } from "@/@types/question";
import { type Operation, OperationIconMap } from "@/constants/maps/operation";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MathQuestionProps extends QuestionWithFeedback {
	index: number;
	operation: Operation;
	setFeedback: (feedback: boolean | null) => void;
}

export function MathQuestion({
	index,
	firstNumber,
	secondNumber,
	result,
	feedback,
	setFeedback,
	operation,
}: MathQuestionProps) {
	const [input, setInput] = useState("");

	function handleFeedback() {
		if (!input) return setFeedback(null);

		const inputNumber = Number(input);

		setFeedback(inputNumber === result);
	}

	function handleLocalSubmit(e: KeyboardEvent) {
		if (e.key === "Enter") {
			handleFeedback();
		}
	}

	const questionLabel = useMemo(() => `question-${index}`, [index]);

	useEffect(() => {
		console.log("parede");
	}, []);

	return (
		<div className="flex items-center gap-2">
			<Label htmlFor={questionLabel} className="text-nowrap">
				{firstNumber} {OperationIconMap.get(operation)} {secondNumber}
			</Label>
			<Input
				className="max-w-20"
				type="number"
				name={questionLabel}
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onBlur={handleFeedback}
				onClick={handleFeedback}
				onKeyDown={handleLocalSubmit}
				disabled={Boolean(feedback)}
			/>
			{feedback !== null &&
				(feedback ? (
					<CheckIcon className="size-4 text-green-700" />
				) : (
					<XMarkIcon className="size-4 text-red-700" />
				))}
		</div>
	);
}
