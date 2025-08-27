export const scoreRates = ["weak", "ok", "good", "very-good"] as const;

export type ScoreRate = (typeof scoreRates)[number];

export const ScoreRateMap = new Map<ScoreRate, string>([
	["weak", "Fraco"],
	["ok", "Mediano"],
	["good", "Bom"],
	["very-good", "Ótimo"],
]);
