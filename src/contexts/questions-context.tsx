import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { Question, QuestionWithFeedback } from "@/@types/question";
import { config } from "@/constants/config";
import type { Operation } from "@/constants/maps/operation";
import { OperationQuestionGeneratorMap } from "@/constants/maps/operation-question-generator";

type QuestionsContextType = {
	operation: Operation;
	questions: QuestionWithFeedback[];
	questionsCompleted: number;
	questionsReset: () => void;
	handleUpdateFeedback: (index: number, newFeedback: boolean | null) => void;
} | null;

const QuestionsContext = createContext<QuestionsContextType>(null);

export function useQuestionsContext() {
	const context = useContext(QuestionsContext);

	if (context === null) {
		throw new Error("Questions Context Error!");
	}

	return context;
}

interface QuestionsContextProviderProps {
	children: ReactNode;
	operation: Operation;
	onComplete: () => void;
}

export function QuestionsContextProvider({
	operation,
	onComplete,
	children,
}: QuestionsContextProviderProps) {
	const questionsFactory = useCallback((): QuestionWithFeedback[] => {
		return Array.from({ length: config.QUESTIONS_AMOUNT }).map(() => {
			const questionGenerator = OperationQuestionGeneratorMap.get(
				operation,
			) as () => Question;

			return {
				...questionGenerator(),
				feedback: null,
			};
		});
	}, [operation]);

	const [questions, setQuestions] =
		useState<QuestionWithFeedback[]>(questionsFactory);

	const questionsCompleted = questions.filter(
		(question) => question.feedback,
	).length;

	function handleUpdateFeedback(index: number, newFeedback: boolean | null) {
		setQuestions((state) =>
			state.map((question, questionIndex) =>
				questionIndex === index
					? { ...question, feedback: newFeedback }
					: question,
			),
		);
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: Causes infinite re-rendering
	useEffect(() => {
		if (questionsCompleted === questions.length) {
			onComplete();
		}
	}, [questionsCompleted, questions.length]);

	function questionsReset() {
		setQuestions(questionsFactory);
	}

	return (
		<QuestionsContext.Provider
			value={{
				operation,
				questions,
				questionsCompleted,
				handleUpdateFeedback,
				questionsReset,
			}}
		>
			{children}
		</QuestionsContext.Provider>
	);
}
