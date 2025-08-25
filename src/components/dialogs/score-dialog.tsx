import { Link } from "react-router-dom";
import type { Score } from "@/@types/score";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { type ScoreRate, ScoreRateMap } from "@/constants/maps/score-rate";
import { formatMilliseconds } from "@/helpers/format-milliseconds";
import { formatTimer } from "@/helpers/format-timer";

interface ScoreDialogProps {
	score: Score | null;
}

export function ScoreDialog({ score }: ScoreDialogProps) {
	return (
		<Dialog open={Boolean(score)}>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle className="font-title text-center">
						Parabéns, você completou o desafio!
					</DialogTitle>
				</DialogHeader>
				<p>Seu tempo final foi de:</p>
				<h3 className="text-center text-3xl">
					{formatTimer(formatMilliseconds(score?.time as number))}
				</h3>
				<h3 className="text-center text-xl">
					{ScoreRateMap.get(score?.rate as ScoreRate)}
				</h3>
				<DialogFooter className="!justify-center">
					{/* <Button variant="destructive">Limpar Placar</Button> */}
					<Button className="bg-slate-800 text-slate-50" asChild>
						<Link to="/">Tentar Novamente</Link>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
