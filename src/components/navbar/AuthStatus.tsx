import { Avatar, Box, DropdownMenu, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "@src/components";
const AuthStatus = function () {
	const { data: session, status } = useSession();

	const renderElement = function () {
		switch (status) {
			case "authenticated":
				return (
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<Avatar
								src={session?.user?.image!}
								fallback="?"
								radius="full"
								size="2"
								className="cursor-pointer"
								referrerPolicy="no-referrer"
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
				);
			case "unauthenticated":
				return (
					<Link href="/api/auth/signin" className="nav-link">
						Login
					</Link>
				);
			case "loading":
				return <Skeleton width="3rem" />;
			default:
				return <Skeleton width="3rem" />;
		}
	};

	return <Box>{renderElement()}</Box>;
};

export default AuthStatus;
