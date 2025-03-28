import ContentFrame from "@/components/ContentFrame";
import NavFrame from "@/components/NavFrame";

export default function Home() {
	// home page at root ('/')
	// if user is not authenticated, redirect them to login
	return (
		<div className="flex h-[100vh] w-[100vw] flex-col flex-nowrap">
			<div className="h-max w-full border-b-[1px] border-gray-300 p-4">
				<NavFrame />
			</div>
			<div className="h-full w-full overflow-x-hidden overflow-y-auto">
				<ContentFrame />
			</div>
		</div>
	);
}
