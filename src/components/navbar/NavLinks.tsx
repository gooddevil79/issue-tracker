import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
	{
		title: "Dashboard",
		path: "/",
	},
	{
		title: "Issues",
		path: "/issues",
	},
];
const NavLinks = function () {
	const currentPath = usePathname();

	return (
		<ul className="flex space-x-6">
			{navLinks.map(({ path, title }) => (
				<li key={title}>
					<Link
						href={path}
						className={clsx({
							"nav-link": true,
							"!text-zinc-950": currentPath === path,
						})}
					>
						{title}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavLinks;
