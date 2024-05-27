"use client";

import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import AuthStatus from "./AuthStatus";
import NavLinks from "./NavLinks";

const NavBar = function () {
	return (
		<nav className="space-x-6 border-b-2 mb-5 px-5 py-3">
			<Container>
				<Flex justify="between" align="center">
					<Flex align="center" gap="3">
						<Link href="/" className="hover:animate-shake">
							<AiFillBug className="text-2xl" />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;
