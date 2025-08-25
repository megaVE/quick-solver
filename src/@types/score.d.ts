import type { ScoreRate } from "@/constants/maps/score-rate";

export interface Score {
	time: number;
	rate: ScoreRate;
}

export interface ScoreWithTimestamp extends Score {
	createdAt: Date;
}
