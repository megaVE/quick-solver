import { describe, expect, it } from "vitest";
import { getRandomNumber } from "./get-random-number";

describe("Get Random Number", () => {
	const GENERATION_ATTEMPTS = 1000;

	it("should generate a number", () => {
		const randomNumber = getRandomNumber();

		expect(randomNumber).toBeTypeOf("number");
	});
	it("should generate a number between 1 and 10 when no args given", () => {
		const randomNumbers = Array.from({ length: GENERATION_ATTEMPTS }).map(() =>
			getRandomNumber(),
		);

		for (const randomNumber of randomNumbers) {
			expect(randomNumber).toBeGreaterThanOrEqual(1);
			expect(randomNumber).toBeLessThanOrEqual(10);
		}
	});

	it("should generate a number between min and 10 when only min is given", () => {
		const min = 4;

		const randomNumbers = Array.from({ length: GENERATION_ATTEMPTS }).map(() =>
			getRandomNumber({ min }),
		);

		for (const randomNumber of randomNumbers) {
			expect(randomNumber).toBeGreaterThanOrEqual(min);
			expect(randomNumber).toBeLessThanOrEqual(10);
		}
	});

	it("should generate a number between 1 and max when only max is given", () => {
		const max = 25;

		const randomNumbers = Array.from({ length: GENERATION_ATTEMPTS }).map(() =>
			getRandomNumber({ max }),
		);

		for (const randomNumber of randomNumbers) {
			expect(randomNumber).toBeGreaterThanOrEqual(1);
			expect(randomNumber).toBeLessThanOrEqual(max);
		}
	});

	it("should generate a number between min and max when min and max are given", () => {
		const min = 5;
		const max = 50;

		const randomNumbers = Array.from({ length: GENERATION_ATTEMPTS }).map(() =>
			getRandomNumber({ min, max }),
		);

		for (const randomNumber of randomNumbers) {
			expect(randomNumber).toBeGreaterThanOrEqual(min);
			expect(randomNumber).toBeLessThanOrEqual(max);
		}
	});
});
