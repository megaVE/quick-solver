import { beforeEach, describe, expect, it } from "vitest";
import { formatTimestamp } from "./format-timestamp";

describe("Format Timestamp", () => {
	let date: Date;
	const dateRegex = /^\d{2}:\d{2}, \d{2}\/\d{2}\/\d{2}$/;

	beforeEach(() => {
		date = new Date();
	});

	it("should return a string out of a date input", () => {
		const timestamp = formatTimestamp(date);

		expect(timestamp).toBeTypeOf("string");
	});

	it('should have the format "HH:mm, DD/MM/YY"', () => {
		const timestamp = formatTimestamp(date);

		expect(timestamp).toMatch(dateRegex);
	});
});
