export type ScoreRate = "weak" | "ok" | "good" | "very-good";

export const ScoreRateMap = new Map<ScoreRate, string>([
	["weak", "Fraco"],
	["ok", "Mediano"],
	["good", "Bom"],
	["very-good", "Ótimo"],
]);
