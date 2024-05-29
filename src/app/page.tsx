import prisma from "@/prisma/client";
import IssueSummary from "@src/components/IssueSummary";
import LatestIssuesTable from "@src/components/LatestIssuesTable";

export default async function Home() {
	const open = await prisma.issue.count({ where: { status: "OPEN" } });
	const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
	const inProgress = await prisma.issue.count({
		where: { status: "IN_PROGRESS" },
	});
	return (
		<div>
			<IssueSummary open={open} closed={closed} inProgress={inProgress} />
			<LatestIssuesTable />
		</div>
	);
}
