import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";
import { cache } from "react";

interface Props {
	params: { issueId: string };
}
const fetchIssue = cache(async (issueId: string) => {
	const issue = await prisma.issue.findUnique({
		where: { id: issueId },
	});
	return issue;
});

export const generateMetadata = async ({ params }: Props) => {
	const issue = await fetchIssue(params.issueId);
	return {
		title: issue?.title,
		description: "Details of issue " + issue?.title,
	};
};

const IssueEditPage = async function ({ params: { issueId } }: Props) {
	const issue = await fetchIssue(issueId);
	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};

export default IssueEditPage;
