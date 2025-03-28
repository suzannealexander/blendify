import HomeFrame from "@/components/HomeFrame";
import PageLayout from "@/components/PageLayout";
import { UserDisplayData } from "@/schema";

const placeholderUser: UserDisplayData = {
	id: 1,
	username: "bea-bm",
	photoPath: "/profile-placeholder.png",
	groups: [
		{
			id: 101,
			name: "Home 🏠︎",
			events: [
				{
					name: "Vacuum the living room",
					date: "2025-03-26",
					completed: false,
				},
				{
					name: "Wash the car",
					date: "2025-03-27",
					completed: false,
				},
				{
					name: "Clean the cat's water fountain",
					date: "2025-03-29",
					completed: false,
				},
			],
		},
		{
			id: 102,
			name: "Chicago Trip 🏙️",
			events: [
				{
					name: "Take out the trash",
					date: "2025-03-29",
					completed: false,
				},
				{
					name: "Clean the kitchen",
					date: "2025-03-30",
					completed: false,
				},
				{
					name: "Clean AirBNB before checkout",
					date: "2025-04-01",
					completed: false,
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
			<HomeFrame userData={placeholderUser} />
		</PageLayout>
	);
}
