import LoginForm from "@/components/LoginForm";
import NavFrame from "@/components/NavFrame";
import Link from "next/link";

function LoginFrame() {
	return (
		<div className="m-auto h-full max-w-md space-y-8 py-12">
			<div className="text-center">
				<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
					Log in to your account
				</h2>
				<p className="mt-2 text-sm text-gray-600">
					Welcome back! Please enter your details.
				</p>
			</div>
			<LoginForm />
			<div className="text-center">
				<Link
					href="/signup"
					className="font-medium text-purple-600 hover:text-purple-500"
				>
					Don't have an account? Sign up
				</Link>
			</div>
		</div>
	);
}
export default function LoginPage() {
	return (
		<div className="flex h-[100vh] w-[100vw] flex-col flex-nowrap">
			<div className="h-max w-full border-b-[1px] border-gray-300 p-4">
				<NavFrame />
			</div>
			<div className="h-full w-full overflow-x-hidden overflow-y-auto">
				<LoginFrame />
			</div>
		</div>
	);
}
