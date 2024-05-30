import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

export const metadata: Metadata = {
	title: "Issue Tracker | New",
	description: "Create new issues",
};

const NewIssuePage = async function () {
	return <IssueForm />;
};

export default NewIssuePage;
