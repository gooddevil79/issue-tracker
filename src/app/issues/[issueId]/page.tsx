import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@src/app/api/auth/[...nextauth]/authOptions";
import AssigneeSelect from "@src/components/AssigneeSelect";

const IssueDetailsPage = async function ({
	params: { issueId },
}: {
	params: { issueId: string };
}) {
	const session = await getServerSession(authOptions);

	if (typeof issueId !== "string") {
		notFound();
	}
	let issue;

	try {
		issue = await prisma.issue.findUnique({ where: { id: issueId } });
	} catch (error) {
		console.log(error);
		return <h1>Something went wrong! Please try later</h1>;
	}

	if (!issue) notFound();

	return (
		<Grid columns={{ initial: "1", sm: "5" }} gap="3">
			<Box className="space-y-3 md:col-span-4 ">
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Flex gap="2" direction="column">
					<AssigneeSelect issue={issue} />
					<EditIssueButton issueId={issueId} />
					<DeleteIssueButton issueId={issueId} />
				</Flex>
			)}
		</Grid>
	);
};

export default IssueDetailsPage;
