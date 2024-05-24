import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@src/components/Issue/IssueStatusBadge";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

const IssueDetailsPage = async function ({
	params: { issueId },
}: {
	params: { issueId: string };
}) {
	if (typeof issueId !== "string") {
		notFound();
	}

	const issue = await prisma.issue.findUnique({ where: { id: issueId } });

	if (!issue) notFound();
	return (
		<div className="space-y-3">
			<Heading as="h1">{issue?.title}</Heading>
			<Flex gap="4" align="center">
				<IssueStatusBadge status={issue?.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className="prose">
				<ReactMarkdown>{issue?.description}</ReactMarkdown>
			</Card>
		</div>
	);
};

export default IssueDetailsPage;
