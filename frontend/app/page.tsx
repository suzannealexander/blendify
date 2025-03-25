import ContentFrame from "@/components/ContentFrame";
import NavFrame from "@/components/NavFrame";

export default function Home() {
	// home page at root ('/')
	// if user is not authenticated, redirect them to login
	return (
		<div className="flex h-[100vh] w-[100vw] flex-col flex-nowrap bg-blue-200">
			<div className="h-42 w-full bg-red-400">
				<NavFrame />
			</div>
			<div className="h-full w-full items-center bg-red-200">
				<ContentFrame />
			</div>
		</div>
	);
}
