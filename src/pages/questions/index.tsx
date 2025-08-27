import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
import type { ScoreRateTimestamp } from "@/@types/score";
import { InstructionsDialog } from "@/components/dialogs/instructions-dialog";
import { ReloadDialog } from "@/components/dialogs/reload-dialog";
import { ScoreDialog } from "@/components/dialogs/score-dialog";
import type { Operation } from "@/constants/maps/operation";
import { OperationScoreRateTimestampMap } from "@/constants/maps/operation-score-rate-timestamp";
import { QuestionsContextProvider } from "@/contexts/questions-context";
import { getScoreRateFromTime } from "@/helpers/get-score-rate-from-time";
import { QuestionsDisplay } from "./display";
import { QuestionsHeader } from "./header";

export function QuestionsPage() {
	const params = useParams();
	const [searchParams] = useSearchParams();

	const focusMode: boolean = JSON.parse(searchParams.get("focus") as string);

	const operation = params.operation as Operation;

	const timer = useStopwatch({
		autoStart: false,
		interval: 20,
	});

	const [isReloadDialogOpen, setIsReloadDialogOpen] = useState(false);
	const [currentScore, setCurrentScore] = useState<ScoreRateTimestamp | null>(
		null,
	);

	function handleToggleInstructionsModal(open: boolean) {
		if (open) return;

		onStart();
	}

	function handleReload() {
		setIsReloadDialogOpen(true);
	}

	function onStart() {
		timer.start();
	}

	function onComplete() {
		timer.pause();
		setCurrentScore({
			time: timer.totalMilliseconds,
			rate: getScoreRateFromTime(
				OperationScoreRateTimestampMap.get(operation) as ScoreRateTimestamp[],
				timer.totalMilliseconds,
			),
		});
	}

	return (
		<QuestionsContextProvider operation={operation} onComplete={onComplete}>
			<ScoreDialog score={currentScore} />
			<ReloadDialog
				isOpen={isReloadDialogOpen}
				onOpenChange={(open) => setIsReloadDialogOpen(open)}
			/>
			<InstructionsDialog onOpenChange={handleToggleInstructionsModal} />
			<div>
				<QuestionsHeader timer={timer} handleReload={handleReload} />
				<main className="p-4">
					{focusMode ? (
						<QuestionsDisplay.Focus isRunning={timer.isRunning} />
					) : (
						<QuestionsDisplay.Default isRunning={timer.isRunning} />
					)}
				</main>
			</div>
		</QuestionsContextProvider>
	);
}
