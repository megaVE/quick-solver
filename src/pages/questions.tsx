import {
	ArrowPathIcon,
	ClipboardDocumentListIcon,
	ClockIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import type { Question, QuestionWithFeedback } from "@/@types/question";
import type { Score } from "@/@types/score";
import { InstructionsDialog } from "@/components/dialogs/instructions-dialog";
import { ScoreDialog } from "@/components/dialogs/score-dialog";
import { MathQuestion } from "@/components/math-question";
import { Button } from "@/components/ui/button";
import { config } from "@/constants/config";
import {
	type Operation,
	OperationQuestionGeneratorMap,
	OperationScoreMap,
} from "@/constants/maps/operation";
import { formatTimer } from "@/helpers/format-timer";
import { getScoreRateFromTime } from "@/helpers/get-score-rate-from-time";

export function QuestionsPage() {
	const params = useParams();

	const operation = params.operation as Operation;

	const timer = useStopwatch({
		autoStart: false,
		interval: 20,
	});

	const [currentScore, setCurrentScore] = useState<Score | null>(null);
	const [questions, setQuestions] = useState<QuestionWithFeedback[]>(
		Array.from({ length: config.QUESTIONS_AMOUNT }).map(() => {
			const questionGenerator = OperationQuestionGeneratorMap.get(
				operation,
			) as () => Question;

			return {
				...questionGenerator(),
				feedback: null,
			};
		}),
	);

	const questionsCompleted = questions.filter(
		(question) => question.feedback,
	).length;

	// biome-ignore lint/correctness/useExhaustiveDependencies: Causes infinite re-rendering
	useEffect(() => {
		if (questionsCompleted === questions.length) {
			timer.pause();
			setCurrentScore({
				time: timer.totalMilliseconds,
				rate: getScoreRateFromTime(
					OperationScoreMap.get(operation) as Score[],
					timer.totalMilliseconds,
				),
			});
		}
	}, [questionsCompleted, questions.length]);

	function handleToggleDialog(open: boolean) {
		if (open) return;

		timer.start();
	}

	function handleUpdateFeedback(index: number, newFeedback: boolean | null) {
		setQuestions((state) =>
			state.map((question, questionIndex) =>
				questionIndex === index
					? { ...question, feedback: newFeedback }
					: question,
			),
		);
	}

	return (
		<>
			<ScoreDialog score={currentScore} />
			<InstructionsDialog onOpenChange={handleToggleDialog} />
			<div>
				<header className="flex items-center border-b border-slate-300 bg-slate-100 shadow-md p-4 mb-4 gap-4">
					<h1 className="font-title text-3xl text-shadow-md">
						<Link to="/">Quick Table</Link>
					</h1>
					<div className="flex items-center gap-2">
						<ClipboardDocumentListIcon className="size-4" />
						<p>
							{questionsCompleted} / {config.QUESTIONS_AMOUNT}
						</p>
					</div>
					<div className="flex items-center gap-2 w-24">
						<ClockIcon className="size-4" />
						<p>
							{formatTimer({
								minutes: timer.minutes,
								seconds: timer.seconds,
								milliseconds: timer.milliseconds,
							})}
						</p>
					</div>
					<Button size="icon">
						<ArrowPathIcon />
					</Button>
				</header>
				<main className="p-4">
					<div className="container flex md:grid flex-col md:grid-cols-2 gap-2">
						<ul className="flex flex-col gap-2">
							{questions
								.slice(0, config.COL_SIZE)
								.map((question, questionIndex) => (
									<li key={`question-${questionIndex.toString()}`}>
										<MathQuestion
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
							{questions
								.slice(-config.COL_SIZE)
								.map((question, questionIndex) => (
									<li
										key={`question-${(questionIndex + config.COL_SIZE).toString()}`}
									>
										<MathQuestion
											index={config.COL_SIZE + questionIndex + 1}
											{...question}
											operation={operation}
											setFeedback={(feedback) =>
												handleUpdateFeedback(
													questionIndex + config.COL_SIZE,
													feedback,
												)
											}
										/>
									</li>
								))}
						</ul>
					</div>
				</main>
			</div>
		</>
	);
}
