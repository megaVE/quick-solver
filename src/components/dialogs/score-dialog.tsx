import { type FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ScoreRateTimestamp } from "@/@types/score";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { config } from "@/constants/config";
import { type ScoreRate, ScoreRateMap } from "@/constants/maps/score-rate";
import { useQuestionsContext } from "@/contexts/questions-context";
import { formatMilliseconds } from "@/helpers/format-milliseconds";
import { formatTimer } from "@/helpers/format-timer";
import { useScoreboard } from "@/hooks/use-scoreboard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ScoreDialogProps {
	score: ScoreRateTimestamp | null;
}

export function ScoreDialog({ score }: ScoreDialogProps) {
	const { operation } = useQuestionsContext();

	const navigate = useNavigate();

	const [scoreboard, updateScoreboard] = useScoreboard();

	const [playerName, setPlayerName] = useState("");

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		updateScoreboard(operation, {
			playerName,
			time: score?.time as number,
			rate: score?.rate as ScoreRate,
			createdAt: new Date(),
		});
		setPlayerName("");
		navigate(`/results?category=${operation}`);
	}

	const isNewScoreRecord = useMemo(() => {
		const currentScoreboard = scoreboard[operation];

		if (currentScoreboard.length < config.LEADERBOARD_SIZE) return true;

		const currentScore = score?.time as number;
		const lesserScoreboardScore = currentScoreboard.at(0)?.time as number;

		return currentScore <= lesserScoreboardScore;
	}, [score?.time, scoreboard[operation], operation]);

	return (
		<Dialog open={Boolean(score)}>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle className="font-title text-center">
						Parabéns, você completou o Desafio!
					</DialogTitle>
				</DialogHeader>
				<p>Seu tempo final foi de:</p>
				<h3 className="relative text-center text-3xl">
					{isNewScoreRecord && (
						<small className="absolute bottom-0 left-1/2 translate-x-5/6 text-xs text-constructive animate-bounce">
							Novo Record!
						</small>
					)}
					{formatTimer(formatMilliseconds(score?.time as number))}
				</h3>
				<h3 className="text-center text-xl font-bold text-shadow-2xs text-constructive">
					{ScoreRateMap.get(score?.rate as ScoreRate)}
				</h3>
				{isNewScoreRecord ? (
					<div className="flex flex-col gap-2">
						<Label htmlFor="name">Digite seu nome:</Label>
						<form className="flex items-center gap-2" onSubmit={handleSubmit}>
							<Input
								className="flex-1"
								name="name"
								value={playerName}
								onChange={(e) => setPlayerName(e.target.value)}
								placeholder="Anônimo"
							/>
							<Button variant="constructive">Salvar</Button>
						</form>
						<p className="text-center text-sm">
							Seu nome e seu tempo ficarão salvos no <b>Placar</b>
						</p>
					</div>
				) : (
					<DialogFooter className="!justify-center">
						<Button asChild>
							<Link to="/">Tentar Novamente</Link>
						</Button>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
