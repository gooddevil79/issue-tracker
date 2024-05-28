"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const issueStatus: { lable: string; value?: Status }[] = [
	{ lable: "All" },
	{ lable: "Open", value: "OPEN" },
	{ lable: "In Progress", value: "IN_PROGRESS" },
	{ lable: "Closed", value: "CLOSED" },
];

const IssueStatusSelect = function () {
	const router = useRouter();

	const handleFilter = function (status: Status | "all") {
		const query = status == "all" ? "" : `?status=${status}`;
		router.push("/issues" + query);
	};
	return (
		<Select.Root onValueChange={handleFilter}>
			<Select.Trigger placeholder="Filter bt issue status..."></Select.Trigger>
			<Select.Content>
				{issueStatus.map(s => (
					<Select.Item key={s.lable} value={s.value || "all"}>
						{s.lable}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueStatusSelect;
