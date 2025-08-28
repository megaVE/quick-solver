import {
	type FormEvent,
	type KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { MathQuestion } from "@/components/math-question";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { config } from "@/constants/config";
import { OperationIconMap } from "@/constants/maps/operation-icon";
import { useQuestionsContext } from "@/contexts/questions-context";

interface QuestionDisplayProps {
	isRunning: boolean;
}

interface QuestionDisplayPropsDefault extends QuestionDisplayProps {}

interface QuestionDisplayPropsFocus extends QuestionDisplayProps {}

function QuestionsDisplayDefault({ isRunning }: QuestionDisplayPropsDefault) {
	const { operation, questions, handleUpdateFeedback } = useQuestionsContext();

	const firstInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!isRunning) return;

		if (!firstInputRef.current) return;

		firstInputRef.current.focus();
	}, [isRunning]);

	return (
		<div className="container flex md:grid flex-col md:grid-cols-2 gap-2">
			<ul className="flex flex-col gap-2">
				{questions.slice(0, config.COL_SIZE).map((question, questionIndex) => (
					<li key={`question-${questionIndex.toString()}`}>
						<MathQuestion
							ref={questionIndex === 0 ? firstInputRef : undefined}
							index={questionIndex + 1}
							{...question}
							operation={operation}
							setFeedback={(feedback) =>
								handleUpdateFeedback(questionIndex, feedback)
							}
						/>
					</li>
				))}
			</ul>
			<ul className="flex flex-col gap-2">
				{questions.slice(-config.COL_SIZE).map((question, questionIndex) => (
					<li key={`question-${(questionIndex + config.COL_SIZE).toString()}`}>
						<MathQuestion
							index={config.COL_SIZE + questionIndex + 1}
							{...question}
							operation={operation}
							setFeedback={(feedback) =>
								handleUpdateFeedback(questionIndex + config.COL_SIZE, feedback)
							}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

function QuestionsDisplayFocus({ isRunning }: QuestionDisplayPropsFocus) {
	const { operation, questions, handleUpdateFeedback } = useQuestionsContext();

	const [answer, setAnswer] = useState("");
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const currentQuestion = questions[currentQuestionIndex];

	const inputRef = useRef<HTMLInputElement>(null);

	function handleLocalSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		handleFeedback();
	}

	function handleTab(e: KeyboardEvent) {
		if (e.key !== "Tab") return;

		e.preventDefault();

		handleFeedback();
	}

	function handleFeedback() {
		if (Number(answer) !== currentQuestion.result) return;

		handleUpdateFeedback(currentQuestionIndex, true);
		setAnswer("");
		setCurrentQuestionIndex((state) =>
			state < questions.length - 1 ? state + 1 : state,
		);

		if (!inputRef.current) return;

		inputRef.current.focus();
	}

	useEffect(() => {
		if (!isRunning) return;

		if (!inputRef.current) return;

		inputRef.current.focus();
	}, [isRunning]);

	return (
		<div className="flex flex-col items-center gap-12 md:gap-40">
			<Label htmlFor="question" className="font-title text-9xl text-center">
				{currentQuestion.firstNumber} {OperationIconMap.get(operation)}{" "}
				{currentQuestion.secondNumber}
			</Label>
			<form onSubmit={handleLocalSubmit}>
				<Input
					className="size-40 !text-8xl text-center remove-arrow"
					type="number"
					name="question"
					ref={inputRef}
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
					onBlur={handleFeedback}
					onKeyDown={handleTab}
				/>
			</form>
		</div>
	);
}

export const QuestionsDisplay = {
	Default: QuestionsDisplayDefault,
	Focus: QuestionsDisplayFocus,
};
