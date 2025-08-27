export const operations = [
	"addition",
	"subtraction",
	"multiplication",
	"division",
] as const;

export type Operation = (typeof operations)[number];

export const OperationMap = new Map<Operation, string>([
	["addition", "Adição"],
	["subtraction", "Subtração"],
	["multiplication", "Multiplicação"],
	["division", "Divisão"],
]);
