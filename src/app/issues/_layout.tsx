import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function IssuesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="mb-3">
				<Button>
					<Link href="/issues/new">New Issue</Link>
				</Button>
			</div>
			{children}
		</>
	);
}
