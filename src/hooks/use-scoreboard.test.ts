import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { config } from "@/constants/config";
import type { Operation } from "@/constants/maps/operation";
import { useScoreboard } from "./use-scoreboard";

describe("useScoreboard", () => {
	it("should contain a blank scoreboard when not initialized", () => {
		const { result } = renderHook(() => useScoreboard());

		for (const scoreboardItem of Object.values(result.current[0])) {
			expect(scoreboardItem).toHaveLength(0);
			expect(Array.isArray(scoreboardItem)).toBeTruthy();
		}
	});

	it("should never allow an category to have more results than LEADERBOARD_SIZE", () => {
		const operation: Operation = "addition";

		const { result, rerender } = renderHook(() => useScoreboard());

		for (let i = 0; i < config.LEADERBOARD_SIZE + 1; i++) {
			result.current[1](operation, {
				playerName: "Lorem",
				rate: "ok",
				time: Math.floor(Math.random() * 200),
				createdAt: new Date(),
			});
			rerender();
		}

		expect(result.current[0][operation]).toHaveLength(config.LEADERBOARD_SIZE);
	});
});
