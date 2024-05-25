import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
	href: string;
	className?: string;
	children: ReactNode;
}

const Link = function ({ href, children, className }: Props) {
	return (
		<NextLink href={href} className={className} passHref legacyBehavior>
			<RadixLink>{children}</RadixLink>
		</NextLink>
	);
};

export default Link;
