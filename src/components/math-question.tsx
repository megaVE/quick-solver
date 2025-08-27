import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { type FormEvent, type RefObject, useMemo, useState } from "react";
import type { QuestionWithFeedback } from "@/@types/question";
import type { Operation } from "@/constants/maps/operation";
import { OperationIconMap } from "@/constants/maps/operation-icon";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface MathQuestionProps extends QuestionWithFeedback {
	index: number;
	ref?: RefObject<HTMLInputElement | null>;
	operation: Operation;
	setFeedback: (feedback: boolean | null) => void;
}

export function MathQuestion({
	index,
	ref,
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

	function handleLocalSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		handleFeedback();
	}

	const questionLabel = useMemo(() => `question-${index}`, [index]);

	return (
		<div className="flex items-center gap-2">
			<Label htmlFor={questionLabel} className="text-nowrap w-12">
				{firstNumber} {OperationIconMap.get(operation)} {secondNumber}
			</Label>
			<form onSubmit={handleLocalSubmit}>
				<Input
					className="max-w-20"
					type="number"
					name={questionLabel}
					ref={ref}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onBlur={handleFeedback}
					onClick={handleFeedback}
					disabled={Boolean(feedback)}
				/>
			</form>
			{feedback !== null &&
				(feedback ? (
					<CheckIcon className="size-4 text-green-700" />
				) : (
					<XMarkIcon className="size-4 text-red-700" />
				))}
		</div>
	);
}
