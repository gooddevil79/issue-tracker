import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = function ({ issueId }: { issueId: string }) {
	return (
		<Button>
			<Link
				href={`/issues/edit/${issueId}`}
				className="flex items-center gap-2 "
			>
				<Pencil2Icon />
				Edit Issue
			</Link>
		</Button>
	);
};

export default EditIssueButton;
