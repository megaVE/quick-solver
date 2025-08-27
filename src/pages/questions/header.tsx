import {
	ArrowPathIcon,
	ClipboardDocumentListIcon,
	ClockIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { config } from "@/constants/config";
import { useQuestionsContext } from "@/contexts/questions-context";
import { formatTimer } from "@/helpers/format-timer";

interface QuestionsHeaderProps {
	handleReload: () => void;
	timer: {
		minutes: number;
		seconds: number;
		milliseconds: number;
	};
}

export function QuestionsHeader({ handleReload, timer }: QuestionsHeaderProps) {
	const { questionsCompleted } = useQuestionsContext();

	return (
		<header className="sticky top-0 md:static flex items-center border-b border-slate-300 bg-slate-100 shadow-md p-4 mb-4 gap-4">
			<h1 className="font-title text-3xl text-shadow-md">
				<Link to="/">Quick Solver</Link>
			</h1>
			<div className="flex items-center gap-2 whitespace-nowrap">
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
			<Button size="icon" onClick={handleReload}>
				<ArrowPathIcon />
			</Button>
		</header>
	);
}
