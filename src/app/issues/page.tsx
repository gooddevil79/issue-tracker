import { Button, Flex } from "@radix-ui/themes";
import IssueTable from "@src/app/issues/IssueTable";
import Link from "next/link";
import { Suspense } from "react";
import TableSkeleton from "./TableSkeleton";
import IssueStatusSelect from "@src/components/IssueStatusSelect";
import { Issue, Status } from "@prisma/client";

const IssuesPage = async function ({
	searchParams,
}: {
	searchParams: { status: Status; orderBy: keyof Issue };
}) {
	return (
		<div>
			<Flex mb="3" justify="between">
				<Button>
					<Link href="/issues/new">New Issue</Link>
				</Button>
				<IssueStatusSelect />
			</Flex>
			<Suspense fallback={<TableSkeleton />}>
				<IssueTable searchParams={searchParams} />
			</Suspense>
		</div>
	);
};

export const dynamic = "force-dynamic";

export default IssuesPage;
