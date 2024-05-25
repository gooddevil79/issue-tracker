import { Button } from "@radix-ui/themes";
import IssueTable from "@src/app/issues/IssueTable";
import Link from "next/link";
import React, { Suspense } from "react";

import TableSkeleton from "@src/app/issues/TableSkeleton";

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

export const dynamic = "force-dynamic";

export default IssuesPage;
