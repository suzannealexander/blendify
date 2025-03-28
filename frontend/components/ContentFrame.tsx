"use client";

import { Group } from "@/schema";
import { Dispatch, SetStateAction, use, useState } from "react";

function GroupSelectorButton({
	label,
	currentGroupId,
	nextGroupId,
	setGroupId,
}: {
	label: string;
	currentGroupId: number | null;
	nextGroupId: number;
	setGroupId: Dispatch<SetStateAction<number | null>>;
}) {
	const handleClick = () => setGroupId(nextGroupId);
	// make an explicit new version of this component to create new groups
	// should it redirect the user or just set a diff page state?

	return (
		<div
			className="cursor-pointer rounded p-2 text-sm hover:bg-gray-50"
			onClick={handleClick}
		>
			{label}
		</div>
	);
}

function GroupSelector({ groups }: { groups: Group[] }) {
	const [currentGroup, setCurrentGroup] = useState<number | null>(null);
	return (
		<div className="flex flex-row flex-nowrap items-center justify-center gap-8 border-b-[1px] border-gray-200 p-4">
			<GroupSelectorButton
				label={"+ New Group"}
				currentGroupId={currentGroup}
				nextGroupId={0}
				setGroupId={setCurrentGroup}
			/>
			{groups.map((group: Group) => (
				<GroupSelectorButton
					key={group.id}
					label={group.name}
					currentGroupId={currentGroup}
					nextGroupId={group.id}
					setGroupId={setCurrentGroup}
				/>
			))}
		</div>
	);
}

export default function ContentFrame() {
	// query whether the user is a member of any groups
	// placeholder for now
	const groups: Group[] = [
		{
			id: 1,
			name: "Test Group",
			status: "active",
			expiration: null,
			timezone: "est", // consider this later
			creatorId: 0,
			memberIds: [],
			eventIds: [],
			costIds: [],
		},
	];
	return (
		<div className="m-auto h-full w-full max-w-5xl">
			<GroupSelector groups={groups} />
			<div className="flex h-full w-full flex-row flex-nowrap gap-12 p-10">
				<ToDoFrame />
				<CalendarFrame />
			</div>
		</div>
	);
}

interface ToDo {
	label: string;
	completed: boolean;
}

function ToDoItem({ todo }: { todo: ToDo }) {
	return (
		<div className="flex items-center gap-2 p-1 hover:bg-gray-50">
			<input
				type="checkbox"
				checked={todo.completed}
				readOnly
				className="h-5 w-5 rounded-lg accent-purple-500"
			/>
			<span
				className={todo.completed ? "text-gray-500 line-through" : ""}
			>
				{todo.label}
			</span>
		</div>
	);
}

function ToDoFrame() {
	const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

	const handlePrevDay = () => {
		setCurrentDate(currentDate.subtract(1, "day"));
	};

	const handleNextDay = () => {
		setCurrentDate(currentDate.add(1, "day"));
	};

	const toDoList: ToDo[] = [
		{ label: "Vacuum living room", completed: true },
		{ label: "Vacuum bedrooms", completed: true },
		{ label: "Wash dishes", completed: false },
		{ label: "Clean the kitchen", completed: false },
	];

	return (
		<div className="h-max w-1/2 rounded-lg border-[1px] border-gray-300 p-4 shadow-sm">
			<div className="h-max w-full text-center text-lg font-[500]">
				To-Do
			</div>
			<div className="flex h-max flex-row flex-nowrap items-center justify-between p-1">
				<button
					onClick={handlePrevDay}
					className="rounded-lg hover:bg-gray-50"
				>
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
						className="rounded-lg stroke-gray-400 hover:stroke-purple-500"
					>
						<path d="m15 18-6-6 6-6" />
					</svg>
				</button>
				<div className="w-full text-center text-sm leading-6 text-gray-600">
					{currentDate.format("MMMM D, YYYY")}
				</div>
				<button
					onClick={handleNextDay}
					className="rounded-lg hover:bg-gray-50"
				>
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
						className="rounded-lg stroke-gray-400 hover:stroke-purple-500"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</button>
			</div>
			<div className="flex flex-col flex-nowrap gap-2 p-6">
				{toDoList.map((toDo: ToDo, idx: number) => (
					<ToDoItem key={idx} todo={toDo} />
				))}
			</div>
		</div>
	);
}

// function CalendarFrame() {
// 	return (
// 		<div className="h-max w-full rounded-lg border-[1px] border-gray-300 p-4 shadow-sm">
// 			<div className="h-max w-full text-center text-lg font-[500]">
// 				Calendar
// 			</div>
// 			<div className="m-auto h-max w-max p-2">(put calendar here)</div>
// 		</div>
// 	);
// }

// import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);

function CalendarFrame() {
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
