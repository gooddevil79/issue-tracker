"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import {
	Avatar,
	Box,
	Container,
	DropdownMenu,
	Flex,
	Switch,
	Text,
} from "@radix-ui/themes";

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
	const currentPath = usePathname();
	const { data: session, status } = useSession();
	console.log(session?.user?.image);
	return (
		<nav className="flex space-x-6 border-b-2 mb-5 px-5 py-4 items-center">
			<Container>
				<Flex justify="between" align="center">
					<Flex align="center" gap="3">
						<Link href="/" className="hover:animate-shake">
							<AiFillBug className="text-2xl" />
						</Link>
						<ul className="flex space-x-6">
							{navLinks.map(({ path, title }) => (
								<li key={title}>
									<Link
										href={path}
										className={`navLink ${
											currentPath === path && "text-zinc-950"
										}`}
									>
										{title}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					{/* <Switch ml="auto" mr="2" color="indigo" defaultChecked /> */}

					<Box>
						{status == "authenticated" && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										src={session?.user?.image!}
										fallback="?"
										radius="full"
										size="2"
										className="cursor-pointer"
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text>{session.user!.email}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item shortcut="⌘ E">
										<Link href="/api/auth/signout">Logout</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}

						{status == "unauthenticated" && (
							<Link href="/api/auth/signin">Login</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
