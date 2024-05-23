import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusBadgeMap: Record<
	Status,
	{ label: string; color: "red" | "violet" | "green" }
> = {
	OPEN: { color: "red", label: "Open" },
	IN_PROGRESS: { color: "violet", label: "In Progress" },
	CLOSED: { color: "green", label: "Closed" },
};

const IssueStatusBadge = function ({
	status,
	size,
}: {
	status: Status;
	size?: "1" | "2" | "3";
}) {
	return (
		<Badge color={statusBadgeMap[status].color} size={size}>
			{statusBadgeMap[status].label}
		</Badge>
	);
};

export default IssueStatusBadge;
