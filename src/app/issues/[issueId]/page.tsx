import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import delay from "delay";

const IssueDetailsPage = async function ({
	params: { issueId },
}: {
	params: { issueId: string };
}) {
	await delay(5000);

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
		<Grid columns={{ initial: "1", sm: "5" }} gap="3">
			<Box className="space-y-3 md:col-span-4 ">
				<IssueDetails issue={issue} />
			</Box>
			<Flex gap="2" direction="column">
				<EditIssueButton issueId={issueId} />
				<DeleteIssueButton issueId={issueId} />
			</Flex>
		</Grid>
	);
};

export default IssueDetailsPage;
