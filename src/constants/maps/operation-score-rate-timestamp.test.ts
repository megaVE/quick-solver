import { beforeEach, describe, expect, it } from "vitest";
import type { ScoreRateTimestamp } from "@/@types/score";
import { operations } from "./operation";
import { OperationScoreRateTimestampMap } from "./operation-score-rate-timestamp";
import { type ScoreRate, scoreRates } from "./score-rate";

describe("Operation Score", () => {
	let scoreArrays: Array<ScoreRateTimestamp[]>;

	beforeEach(() => {
		scoreArrays = operations.map(
			(operation) =>
				OperationScoreRateTimestampMap.get(operation) as ScoreRateTimestamp[],
		);
	});

	it("should generate an array with the properties time and rate", () => {
		for (const scoreArray of scoreArrays) {
			expect(scoreRates).toContain(scoreArray[0].rate);
			expect(scoreArray[0].time).toBeTypeOf("number");
		}
	});

	it("should generate an array properly sortable by time", () => {
		scoreArrays = scoreArrays.map((scoreArray) =>
			scoreArray.sort((a, b) => b.time - a.time),
		);

		for (const scoreArray of scoreArrays) {
			expect(scoreArray[0].rate).toBe("weak" as ScoreRate);
			expect(scoreArray[1].rate).toBe("ok" as ScoreRate);
			expect(scoreArray[2].rate).toBe("good" as ScoreRate);
			expect(scoreArray[3].rate).toBe("very-good" as ScoreRate);
		}
	});
});
