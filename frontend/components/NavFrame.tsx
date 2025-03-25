import Link from "next/link";

function NavSearchBox() {
	return (
		<div className="border-[1px] border-gray-400 bg-gray-50 p-2">
			<input type="text" placeholder={"Search"} />
		</div>
	);
}

function NavButton({ label, href }: { label: string; href: string }) {
	return (
		<Link
			href={href}
			className="w-24 border-[1px] border-gray-400 bg-gray-50 p-2 text-center"
		>
			{label}
		</Link>
	);
}

export default function NavFrame() {
	return (
		<div className="m-auto flex h-max w-full max-w-5xl flex-row flex-nowrap items-center justify-between gap-32 p-8">
			<div className="text-center text-4xl font-semibold">Do & Due</div>
			<div className="flex flex-row flex-nowrap gap-32">
				<NavButton label={"Home"} href={""} />
				<NavButton label={"Profile"} href={""} />
			</div>
			<NavSearchBox />
		</div>
	);
}
