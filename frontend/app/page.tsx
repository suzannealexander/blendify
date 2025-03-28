import HomeFrame from "@/components/HomeFrame";
import PageLayout from "@/components/PageLayout";
import dayjs, { Dayjs } from "dayjs";

interface EventData {
	name: string;
	date: Dayjs;
}

// placeholder interface to describe the expected format of group data
interface GroupData {
	groupId: number;
	name: string;
	events: EventData[];
}

// placeholder interface to describe the expected format of user data
interface UserData {
	userId: number;
	username: string;
	photoPath: string;
	groups: GroupData[];
}

const placeholderUser: UserData = {
	userId: 1,
	username: "bea-bm",
	photoPath: "/profile-placeholder.png",
	groups: [
		{
			groupId: 101,
			name: "Home 🏠︎",
			events: [
				{
					name: "Vacuum the living room",
					date: dayjs("2025-03-26T10:00:00"),
				},
				{
					name: "Wash the car",
					date: dayjs("2025-03-27T12:00:00"),
				},
				{
					name: "Clean the cat's water fountain",
					date: dayjs("2025-03-29T09:00:00"),
				},
			],
		},
		{
			groupId: 102,
			name: "Chicago Trip 🏙️",
			events: [
				{
					name: "Take out the trash",
					date: dayjs("2025-03-29T20:00:00"),
				},
				{
					name: "Clean the kitchen",
					date: dayjs("2025-03-30T12:00:00"),
				},
				{
					name: "Clean AirBNB before checkout",
					date: dayjs("2025-04-01T12:00:00"),
				},
			],
		},
	],
};

export default function Home() {
	// home page at root ('/')
	// if user is not authenticated, redirect them to login
	return (
		<PageLayout>
			<HomeFrame />
		</PageLayout>
	);
}
