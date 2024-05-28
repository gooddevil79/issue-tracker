import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@src/components";
import ReactMarkdown from "react-markdown";

const IssueDetails = function ({ issue }: { issue: Issue }) {
	return (
		<>
			<Heading as="h1">{issue?.title}</Heading>
			<Flex gap="4" align="center">
				<IssueStatusBadge status={issue?.status} />
				<Text>{issue.createdAt.toDateString()}</Text>
			</Flex>
			<Card className="prose max-w-full">
				<ReactMarkdown>{issue?.description}</ReactMarkdown>
			</Card>
		</>
	);
};

export default IssueDetails;
