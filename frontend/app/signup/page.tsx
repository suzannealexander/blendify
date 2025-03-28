import PageLayout from "@/components/PageLayout";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";

function SignupFrame() {
	return (
		<div className="m-auto h-full max-w-md space-y-8 py-12">
			<div className="text-center">
				<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
					Create an account
				</h2>
			</div>
			<SignupForm />
			<div className="text-center">
				<Link
					href="/login"
					className="font-medium text-purple-600 hover:text-purple-500"
				>
					Already have an account? Log in
				</Link>
			</div>
		</div>
	);
}
export default function SignupPage() {
	return (
		<PageLayout>
			<SignupFrame />
		</PageLayout>
	);
}
