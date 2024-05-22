import Link from "next/link";
import React from "react";

import { AiFillBug } from "react-icons/ai";

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

const NavBar = function () {
	return (
		<nav className="flex space-x-6 border-b-2 mb-5 px-5 h-14 items-center">
			<Link href="/" className="hover:animate-shake">
				<AiFillBug className="text-2xl" />
			</Link>
			<ul className="flex space-x-6">
				{navLinks.map(({ path, title }) => (
					<li key={title}>
						<Link href={path} className="navLink">
							{title}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
