import { beforeEach, describe, expect, it } from "vitest";
import type { ScoreRateTimestamp } from "@/@types/score";
import { type ScoreRate, scoreRates } from "@/constants/maps/score-rate";
import { getScoreRateFromTime } from "./get-score-rate-from-time";

describe("Get Score Rate from Time", () => {
	let scoreRateTimestampArray: ScoreRateTimestamp[];

	beforeEach(() => {
		scoreRateTimestampArray = [
			{ rate: "weak", time: 120 },
			{ rate: "ok", time: 90 },
			{ rate: "good", time: 60 },
			{ rate: "very-good", time: 30 },
		];
	});

	it("should return an item of type ScoreRate", () => {
		const scoreRate = getScoreRateFromTime(scoreRateTimestampArray, 80);

		expect(scoreRates).toContain(scoreRate);
	});

	it("should return 'weak' when the time is too high", () => {
		const scoreRate = getScoreRateFromTime(scoreRateTimestampArray, 9999999);

		expect(scoreRate).toEqual("weak" as ScoreRate);
	});

	it("should return 'very-good' when the time is too low", () => {
		const scoreRate = getScoreRateFromTime(scoreRateTimestampArray, 0);

		expect(scoreRate).toEqual("very-good" as ScoreRate);
	});
});
