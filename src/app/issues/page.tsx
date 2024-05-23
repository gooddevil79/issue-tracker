import prisma from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import IssueTable from "@src/components/Issue/IssueTable";
import Link from "next/link";
import React, { Suspense } from "react";

import TableSkeleton from "@src/components/Issue/TableSkeleton";

const IssuesPage = async function () {
	const issues = await prisma.issue.findMany();
	return (
		<div>
			<div className="mb-3">
				<Button>
					<Link href="/issues/new">New Issue</Link>
				</Button>
			</div>
			<Suspense fallback={<TableSkeleton />}>
				<IssueTable issues={issues} />
			</Suspense>
		</div>
	);
};

export default IssuesPage;
