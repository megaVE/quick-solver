import { dayjs } from "@/lib/dayjs";

export function formatTimestamp(date: Date, relative?: boolean) {
	const dayjsDate = dayjs(date);

	if (relative) {
		return dayjs().from(dayjsDate);
	}
	return dayjsDate.format("HH:mm, DD/MM/YY");
}
