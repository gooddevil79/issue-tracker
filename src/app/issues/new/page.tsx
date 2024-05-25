import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";
import delay from "delay";
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
	ssr: false,
	loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = async function () {
	await delay(30000);
	return (
		<>
			<IssueForm />
		</>
	);
};

export default NewIssuePage;
