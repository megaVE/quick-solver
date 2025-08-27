import type { Scoreboard, ScoreboardItem } from "@/@types/score";
import { config } from "@/constants/config";
import type { Operation } from "@/constants/maps/operation";
import { useLocalStorage } from "./use-local-storage";

const blankScoreboard: Scoreboard = {
	addition: [],
	subtraction: [],
	multiplication: [],
	division: [],
};

export function useScoreboard() {
	const [scoreboard, setScoreboard] = useLocalStorage<Scoreboard>(
		"scoreboard",
		blankScoreboard,
	);

	function updateScoreboard(
		operation: Operation,
		newScoreboardItem: ScoreboardItem,
	) {
		const operationScoreboard = scoreboard?.[operation] as ScoreboardItem[];

		operationScoreboard.push(newScoreboardItem);
		operationScoreboard.sort((a, b) => a.time - b.time);
		if (operationScoreboard.length > config.LEADERBOARD_SIZE) {
			operationScoreboard.pop();
		}

		setScoreboard((state) => {
			const currentScoreboard = state ?? blankScoreboard;

			return { ...currentScoreboard, [operation]: operationScoreboard };
		});
	}

	function resetScoreboard() {
		setScoreboard(blankScoreboard);
	}

	return [scoreboard as Scoreboard, updateScoreboard, resetScoreboard] as const;
}
