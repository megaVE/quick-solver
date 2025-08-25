export function formatMilliseconds(totalMilliseconds: number) {
	const milliseconds = totalMilliseconds % 1000;
	totalMilliseconds = Math.floor(totalMilliseconds / 1000);

	const minutes = Math.floor(totalMilliseconds / 60);
	totalMilliseconds -= minutes * 60;

	const seconds = totalMilliseconds;

	return {
		minutes,
		seconds,
		milliseconds,
	};
}
