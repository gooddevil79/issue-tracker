import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssuesChart from "@src/components/IssuesChart";
import IssueSummary from "@src/components/IssueSummary";
import LatestIssuesTable from "@src/components/LatestIssuesTable";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Issue Tracker | Dashboard",
	description: "View a summary of project issues",
};

export default async function Home() {
	const open = await prisma.issue.count({ where: { status: "OPEN" } });
	const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
	const inProgress = await prisma.issue.count({
		where: { status: "IN_PROGRESS" },
	});
	return (
		<Grid columns={{ initial: "1", md: "2" }} gap="2">
			<Flex direction="column" gap="2">
				<IssueSummary open={open} closed={closed} inProgress={inProgress} />
				<IssuesChart open={open} closed={closed} inProgress={inProgress} />
			</Flex>
			<LatestIssuesTable />
		</Grid>
	);
}
