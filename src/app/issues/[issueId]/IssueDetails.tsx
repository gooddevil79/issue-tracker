import { Issue } from "@prisma/client";
import { Box, Heading, Flex, Card, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@src/components";
import ReactMarkdown from "react-markdown";

const IssueDetails = function ({ issue }: { issue: Issue }) {
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

export default IssueDetails;
