import { Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "./IssueStatusBadge";
import prisma from "@/prisma/client";
import Link from "../Link";

const IssueTable = async function () {
	const issues = await prisma.issue.findMany();

	return (
		<Table.Root variant="surface">
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="hidden md:table-cell">
						Status
					</Table.ColumnHeaderCell>
					<Table.ColumnHeaderCell className="hidden md:table-cell">
						Created
					</Table.ColumnHeaderCell>
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
	);
};

export default IssueTable;
