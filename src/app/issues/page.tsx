import { Button, Flex } from "@radix-ui/themes";
import IssueTable from "@src/app/issues/IssueTable";
import Link from "next/link";
import { Suspense } from "react";
import TableSkeleton from "./TableSkeleton";
import IssueStatusSelect from "@src/components/IssueStatusSelect";
import { Issue, Status } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Issue Tracker | List",
	description: "View a all project issues",
};

const IssuesPage = async function ({
	searchParams,
}: {
	searchParams: { status: Status; orderBy: keyof Issue; page: string };
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
