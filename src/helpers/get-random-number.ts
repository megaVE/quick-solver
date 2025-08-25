export function getRandomNumber({
	min = 1,
	max = 9,
}: {
	min?: number;
	max?: number;
} = {}) {
	return Math.floor(Math.random() * (max - min) + min);
}
