import { describe, expect, it } from "vitest";
import { formatTimer } from "./format-timer";

describe("Format Timer", () => {
	let timestamp: {
		minutes: number;
		seconds: number;
		milliseconds: number;
	};

	it("should always produce a timestamp of at least 7 characters", () => {
		timestamp = {
			minutes: 1,
			seconds: 0,
			milliseconds: 0,
		};

		const formatedTimer = formatTimer(timestamp);

		expect(formatedTimer.length).toBeGreaterThanOrEqual(7);
	});
});
