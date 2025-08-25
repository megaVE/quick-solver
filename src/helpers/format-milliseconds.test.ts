import { beforeEach, describe, expect, it } from "vitest";
import { formatMilliseconds } from "./format-milliseconds";

describe("Format Milliseconds", () => {
	let totalMilliseconds: number;

	beforeEach(() => {
		totalMilliseconds = 412390;
	});

	it("should generate an object with milliseconds, seconds and minutes", () => {
		const timestamp = formatMilliseconds(totalMilliseconds);

		expect(timestamp).toHaveProperty("milliseconds");
		expect(timestamp).toHaveProperty("seconds");
		expect(timestamp).toHaveProperty("minutes");
	});

	it("should correctly calculate milliseconds, seconds and minutes", () => {
		totalMilliseconds = 65999;

		const timestamp = formatMilliseconds(totalMilliseconds);

		expect(timestamp.milliseconds).toEqual(999);
		expect(timestamp.seconds).toEqual(5);
		expect(timestamp.minutes).toEqual(1);
	});
});
