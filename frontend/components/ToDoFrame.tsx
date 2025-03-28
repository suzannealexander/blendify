"use client";

import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

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

export default function ToDoFrame() {
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
