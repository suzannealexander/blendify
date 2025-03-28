import ContentFrame from "@/components/ContentFrame";
import PageLayout from "@/components/PageLayout";

export default function Home() {
	// home page at root ('/')
	// if user is not authenticated, redirect them to login
	return (
		<PageLayout>
			<ContentFrame />
		</PageLayout>
	);
}
