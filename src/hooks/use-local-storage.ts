import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | null = null) {
	const [value, setValue] = useState<T | null>(() => {
		const storedValue = localStorage.getItem(key);

		if ((!storedValue || storedValue === "undefined") && initialValue) {
			localStorage.setItem(key, JSON.stringify(initialValue));
		}

		return storedValue ? JSON.parse(storedValue) : initialValue;
	});

	useEffect(() => {
		if (value) {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			localStorage.removeItem(key);
		}
	}, [value, key]);

	return [value, setValue] as const;
}
