export function formatTimer({
	minutes,
	seconds,
	milliseconds,
}: {
	minutes: number;
	seconds: number;
	milliseconds: number;
}) {
	return `${minutes}:${String(seconds).padStart(2, "0")}:${String((milliseconds / 10).toFixed(0)).padStart(2, "0")}`;
}
