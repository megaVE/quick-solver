const QUESTIONS_AMOUNT = 40;
const COL_SIZE = QUESTIONS_AMOUNT / 2;
const LEADERBOARD_SIZE = 5;

if (COL_SIZE % 1 !== 0) {
	throw new Error("QUESTIONS_AMOUNT must be an even number.");
}

export const config = {
	QUESTIONS_AMOUNT,
	COL_SIZE,
	LEADERBOARD_SIZE,
};
