import type { ScoreRateTimestamp } from "@/@types/score";
import type { ScoreRate } from "@/constants/maps/score-rate";

export function getScoreRateFromTime(
	scoreArray: ScoreRateTimestamp[],
	totalMilliseconds: number,
): ScoreRate {
	const scoreArraySortedByTime = scoreArray.sort((a, b) => b.time - a.time);
	const seconds = totalMilliseconds / 1000;

	for (const score of scoreArraySortedByTime) {
		if (seconds > score.time) return score.rate;
	}

	return "very-good";
}
