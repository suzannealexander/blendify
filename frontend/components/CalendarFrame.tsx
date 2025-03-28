import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useState } from "react";

dayjs.extend(weekday);
dayjs.extend(localeData);

export default function CalendarFrame() {
	const today: Dayjs = dayjs();
	const [currentDate, setCurrentDate] = useState<Dayjs>(today);

	const handlePrevMonth = () => {
		setCurrentDate(currentDate.subtract(1, "month"));
	};

	const handleNextMonth = () => {
		setCurrentDate(currentDate.add(1, "month"));
	};

	return (
		<div className="h-max w-full rounded-lg border-[1px] border-gray-300 p-4 shadow-sm">
			<CalendarHeader
				currentDate={currentDate}
				onPrev={handlePrevMonth}
				onNext={handleNextMonth}
			/>
			<CalendarGrid currentDate={currentDate} today={today} />
		</div>
	);
}

type CalendarHeaderProps = {
	currentDate: Dayjs;
	onPrev: () => void;
	onNext: () => void;
};

function CalendarHeader({ currentDate, onPrev, onNext }: CalendarHeaderProps) {
	return (
		<div className="flex items-center justify-between p-1">
			<button onClick={onPrev} className="rounded-lg hover:bg-gray-50">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="stroke-gray-400 hover:stroke-purple-500"
				>
					<path d="m15 18-6-6 6-6" />
				</svg>
			</button>
			<div className="w-full text-center text-lg font-[500]">
				{currentDate.format("MMMM YYYY")}
			</div>
			<button onClick={onNext} className="rounded-lg hover:bg-gray-50">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="48"
					height="48"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="stroke-gray-400 hover:stroke-purple-500"
				>
					<path d="m9 18 6-6-6-6" />
				</svg>
			</button>
		</div>
	);
}

type CalendarGridProps = {
	currentDate: Dayjs;
	today: Dayjs;
};

function CalendarGrid({ currentDate, today }: CalendarGridProps) {
	const startOfMonth = currentDate.startOf("month");
	const endOfMonth = currentDate.endOf("month");
	const startDay = startOfMonth.weekday();
	const daysInMonth = endOfMonth.date();

	const days: (number | null)[] = Array.from(
		{ length: daysInMonth },
		(_, i) => i + 1,
	);
	const emptyDays: (number | null)[] = Array.from(
		{ length: startDay },
		() => null,
	);
	const calendarDays = [...emptyDays, ...days];
	const weeks: (number | null)[][] = [];
	for (let i = 0; i < calendarDays.length; i += 7) {
		weeks.push(calendarDays.slice(i, i + 7));
	}

	return (
		<>
			<div className="mt-2 grid grid-cols-7 gap-2 text-center font-medium text-gray-600">
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
					(day) => (
						<div key={day} className="p-1">
							{day}
						</div>
					),
				)}
			</div>
			<div className="grid grid-cols-7 gap-2">
				{weeks.map((week, i) =>
					week.map((day, j) => (
						<CalendarDay
							key={`${i}-${j}`}
							day={day}
							today={today}
							currentDate={currentDate}
						/>
					)),
				)}
			</div>
		</>
	);
}

type CalendarDayProps = {
	day: number | null;
	today: Dayjs;
	currentDate: Dayjs;
};

function CalendarDay({ day, today, currentDate }: CalendarDayProps) {
	const isToday =
		day !== null &&
		today.date() === day &&
		today.month() === currentDate.month() &&
		today.year() === currentDate.year();

	return (
		<div
			className={`flex h-16 items-start justify-start rounded-md p-2 text-left text-sm font-semibold ${
				day
					? isToday
						? "bg-purple-200 text-purple-800 hover:bg-purple-300"
						: "bg-gray-100 hover:bg-gray-200"
					: ""
			}`}
		>
			{day && <span>{day}</span>}
		</div>
	);
}
