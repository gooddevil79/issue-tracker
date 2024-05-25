import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@src/components/Issue/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

const IssueDetailsPage = async function ({
	params: { issueId },
}: {
	params: { issueId: string };
}) {
	if (typeof issueId !== "string") {
		notFound();
	}
	let issue;

	try {
		issue = await prisma.issue.findUnique({ where: { id: issueId } });
	} catch (error) {
		console.log(error);
		return <h1>Faild</h1>;
	}

	if (!issue) notFound();

	return (
		<Box className="space-y-3">
			<Heading as="h1">{issue?.title}</Heading>
			<Flex gap="4" align="center">
				<IssueStatusBadge status={issue?.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className="prose">
				<ReactMarkdown>{issue?.description}</ReactMarkdown>
			</Card>
		</Box>
	);
};

export default IssueDetailsPage;
