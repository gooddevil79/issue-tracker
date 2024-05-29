import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
	open: number;
	inProgress: number;
	closed: number;
}
const IssueSummary = function ({ open, inProgress, closed }: Props) {
	const containers: {
		label: string;
		value: number;
		status: Status;
	}[] = [
		{ label: "Open Issues", value: open, status: "OPEN" },
		{ label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
		{ label: "Closed Issues", value: closed, status: "CLOSED" },
	];
	return (
		<Flex gap="2">
			{containers.map(c => (
				<Link href={`/issues?status=${c.status}`}>
					<Card>
						<Text>{c.label}</Text>
						<Text as="p" className="text-2xl font-semibold">
							{c.value}
						</Text>
					</Card>
				</Link>
			))}
		</Flex>
	);
};

export default IssueSummary;
