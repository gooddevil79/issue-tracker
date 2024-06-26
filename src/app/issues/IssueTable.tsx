import { Box, Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import prisma from "@/prisma/client";
import Link from "../../components/Link";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@src/components/Pagination";

const columns: {
	label: string;
	value: keyof Issue;
	className?: string;
}[] = [
	{ label: "Issue", value: "title" },
	{ label: "Status", value: "status", className: "hidden md:table-cell" },
	{ label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssueTable = async function ({
	searchParams,
}: {
	searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) {
	let issues;
	const page = parseInt(searchParams.page) || 1;
	const pageSize = 10;
	let totalIssues = 0;
	const orderBy = columns.map(c => c.value).includes(searchParams.orderBy)
		? { [searchParams.orderBy]: "asc" }
		: undefined;
	try {
		const statusQueries = Object.values(Status);
		const isValidateQuery = statusQueries.includes(searchParams.status);

		issues = await prisma.issue.findMany({
			where: {
				status: isValidateQuery ? searchParams.status : undefined,
			},
			orderBy,
			skip: (page - 1) * pageSize,
			take: pageSize,
		});
		totalIssues = await prisma.issue.count({
			where: {
				status: isValidateQuery ? searchParams.status : undefined,
			},
		});
	} catch (error) {
		console.log(error);
		return <h1>Faild</h1>;
	}

	return (
		<>
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						{columns.map(c => (
							<Table.ColumnHeaderCell key={c.value} className={c.className}>
								<NextLink
									href={{
										query: { ...searchParams, orderBy: c.value },
									}}
									className="flex gap-1 items-center"
								>
									{c.label}
									{c.value === searchParams.orderBy && <ArrowUpIcon />}
								</NextLink>
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map(issue => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>
									{issue.title}
									<div className=" md:hidden">
										<IssueStatusBadge status={issue.status} />
									</div>
								</Link>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
			<Box mt="2">
				<Pagination pageSize={10} itemCount={totalIssues} currentPage={page} />
			</Box>
		</>
	);
};

export default IssueTable;
