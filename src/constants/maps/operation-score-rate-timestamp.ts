import type { ScoreRateTimestamp } from "@/@types/score";
import type { Operation } from "./operation";

export const OperationScoreRateTimestampMap = new Map<
	Operation,
	ScoreRateTimestamp[]
>([
	[
		"addition",
		[
			{ time: 180, rate: "weak" },
			{ time: 130, rate: "ok" },
			{ time: 100, rate: "good" },
			{ time: 80, rate: "very-good" },
		],
	],
	[
		"subtraction",
		[
			{ time: 225, rate: "weak" },
			{ time: 160, rate: "ok" },
			{ time: 125, rate: "good" },
			{ time: 100, rate: "very-good" },
		],
	],
	[
		"multiplication",
		[
			{ time: 270, rate: "weak" },
			{ time: 190, rate: "ok" },
			{ time: 150, rate: "good" },
			{ time: 120, rate: "very-good" },
		],
	],
	[
		"division",
		[
			{ time: 315, rate: "weak" },
			{ time: 225, rate: "ok" },
			{ time: 175, rate: "good" },
			{ time: 140, rate: "very-good" },
		],
	],
]);
