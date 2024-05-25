import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
		<Grid columns={{ initial: "1", md: "2" }} gap="3">
			<IssueDetails issue={issue} />
			<Box>
				<EditIssueButton issueId={issueId} />
			</Box>
		</Grid>
	);
};

export default IssueDetailsPage;
