import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
	params: { issueId: string };
}
const IssueEditPage = async function ({ params: { issueId } }: Props) {
	const issue = await prisma.issue.findUnique({ where: { id: issueId } });
	if (!issue) notFound();

	return <IssueForm issue={issue} />;
};

export default IssueEditPage;
