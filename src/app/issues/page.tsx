import { Button } from "@radix-ui/themes";
import IssueTable from "@src/components/Issue/IssueTable";
import Link from "next/link";
import React, { Suspense } from "react";

import TableSkeleton from "@src/components/Issue/TableSkeleton";

const IssuesPage = async function () {
	return (
		<div>
			<div className="mb-3">
				<Button>
					<Link href="/issues/new">New Issue</Link>
				</Button>
			</div>
			<Suspense fallback={<TableSkeleton />}>
				<IssueTable />
			</Suspense>
		</div>
	);
};

export default IssuesPage;
