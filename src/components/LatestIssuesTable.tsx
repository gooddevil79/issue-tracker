import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./IssueStatusBadge";

const LatestIssuesTable = async function () {
	const issues = await prisma.issue.findMany({
		orderBy: { createdAt: "desc" },
		take: 10,
		include: {
			assignedToUser: true,
		},
	});
	return (
		<Card>
			<Heading size="3">Latest issues :</Heading>
			<Table.Root>
				<Table.Body>
					{issues.map(issue => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Flex direction="column" align="start" gap="1">
									<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
									<IssueStatusBadge status={issue.status} />
								</Flex>
							</Table.Cell>
							{issue.assignedToUser && (
								<Avatar
									src={issue.assignedToUser.image!}
									fallback="?"
									radius="full"
								/>
							)}
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};

export default LatestIssuesTable;
