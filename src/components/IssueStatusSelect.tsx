"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const issueStatus: { lable: string; value?: Status }[] = [
	{ lable: "All" },
	{ lable: "Open", value: "OPEN" },
	{ lable: "In Progress", value: "IN_PROGRESS" },
	{ lable: "Closed", value: "CLOSED" },
];

const IssueStatusSelect = function () {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleFilter = function (status: Status | "all") {
		const params = new URLSearchParams();
		if (status && status !== "all") {
			params.append("status", status);
		}
		if (searchParams.get("orderBy")) {
			params.append("orderBy", searchParams.get("orderBy")!);
		}

		const query = params.size ? "?" + params.toString() : "";
		router.push("/issues" + query);
	};

	return (
		<Select.Root
			defaultValue={searchParams.get("status") || "all"}
			onValueChange={handleFilter}
		>
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
