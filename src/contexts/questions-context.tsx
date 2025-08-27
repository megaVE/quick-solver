import {
	createContext,
	type ReactNode,
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

	return (
		<QuestionsContext.Provider
			value={{ operation, questions, questionsCompleted, handleUpdateFeedback }}
		>
			{children}
		</QuestionsContext.Provider>
	);
}
