"use client";

import { Group } from "@/schema";
import { Dispatch, SetStateAction, use, useState } from "react";

function GroupSelectorButton({
	label,
	nextGroupId,
	setGroupId,
}: {
	label: string;
	nextGroupId: number | null;
	setGroupId: Dispatch<SetStateAction<number | null>>;
}) {
	const handleClick = () => setGroupId(nextGroupId);
	// make an explicit new version of this component to create new groups
	// should it redirect the user or just set a diff page state?
	return (
		<div
			className="border-[1px] border-gray-300 bg-gray-50 p-2 text-sm"
			onClick={handleClick}
		>
			{label}
		</div>
	);
}

function GroupSelector({ groups }: { groups: Group[] }) {
	const [currentGroup, setCurrentGroup] = useState<number | null>(null);
	return (
		<div className="flex flex-row flex-nowrap items-center justify-center gap-8 bg-gray-200 p-4">
			<GroupSelectorButton
				label={"+ New Group"}
				nextGroupId={null}
				setGroupId={setCurrentGroup}
			/>
			{groups.map((group: Group) => (
				<GroupSelectorButton
					key={group.id}
					label={group.name}
					nextGroupId={null}
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
		<div className="m-auto h-full w-full max-w-5xl bg-gray-100">
			<GroupSelector groups={groups} />
			<div className="flex h-full w-full flex-row flex-nowrap gap-12 p-10">
				<ToDoFrame />
				<CalendarFrame />
			</div>
		</div>
	);
}

function ToDoFrame() {
	const [timeframe, setTimeframe] = useState("Today");
	// const stepBack = () => setTimeframe("Yesterday");
	// const stepForward = () => setTimeframe("Tomorrow");

	return (
		<div className="flex w-1/2 flex-col border-[1px] border-gray-400 p-4">
			<div className="h-max w-full text-center">To-Do</div>
			<div className="flex h-max flex-row flex-nowrap justify-between gap-4 p-1">
				<div className="w-full border-[1px] border-gray-400 text-center">
					{"<"}
				</div>
				<div className="w-full text-center text-sm leading-6 text-gray-600">
					{timeframe}
				</div>
				<div className="w-full border-[1px] border-gray-400 text-center">
					{">"}
				</div>
			</div>
		</div>
	);
}

function CalendarFrame() {
	return (
		<div className="h-full w-full border-[1px] border-gray-400 p-4">
			<div className="">(calendar goes here)</div>
		</div>
	);
}
