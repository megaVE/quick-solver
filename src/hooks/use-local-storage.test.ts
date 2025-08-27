import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLocalStorage } from "./use-local-storage";

describe("useLocalStorage", () => {
	beforeEach(() => {
		let store: Record<string, string> = {};

		vi.stubGlobal("localStorage", {
			getItem: vi.fn((key: string) => store[key] ?? null),
			setItem: vi.fn((key: string, value: string) => {
				store[key] = value;
			}),
			key: vi.fn(
				(index: number) =>
					Object.keys(store).find((_, i) => i === index) ?? null,
			),
			removeItem: vi.fn((key: string) => delete store[key]),
			clear: vi.fn(() => {
				store = {};
			}),

			length: store.length,
		});
	});

	it("should create an instance inside the localStorage when a key and an initial value are provided", () => {
		const key = "lorem";
		const initialValue = { lorem: "ipsum" };

		renderHook(() => useLocalStorage(key, initialValue));

		const localValue = localStorage.getItem(key);

		expect(localValue).not.toBeNull();
		expect(JSON.parse(localValue as string)).toEqual(initialValue);
	});

	it("should update the value when the setter is called", () => {
		const key = "lorem";
		const newValue = { lorem: "ipsum" };

		const { result, rerender } = renderHook(() => useLocalStorage(key));

		result.current[1](newValue);

		rerender();

		expect(localStorage.setItem).toBeCalledWith(key, JSON.stringify(newValue));
		expect(result.current[0]).toEqual(newValue);
		expect(localStorage.getItem(key)).toEqual(JSON.stringify(newValue));
		expect(localStorage.key(0)).toBe(key);
	});

	it("should remove the key from localStorage when the setter is called with null", () => {
		const key = "lorem";
		const initialValue = { lorem: "ipsum" };

		const { result, rerender } = renderHook(() =>
			useLocalStorage(key, initialValue),
		);

		rerender();

		result.current[1](null);

		rerender();

		expect(localStorage.removeItem).toBeCalledWith(key);
		expect(result.current[0]).toBeNull();
		expect(localStorage.key(0)).toBeNull();
		expect(localStorage.getItem(key)).toBeNull();
	});
});
