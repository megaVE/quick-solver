import type { ScoreRate } from "@/constants/maps/score-rate";

export interface ScoreRateTimestamp {
	time: number;
	rate: ScoreRate;
}

export interface ScoreboardItem extends ScoreRateTimestamp {
	playerName: string;
	createdAt: Date;
}

export interface Scoreboard {
	addition: ScoreboardItem[];
	subtraction: ScoreboardItem[];
	multiplication: ScoreboardItem[];
	division: ScoreboardItem[];
}
