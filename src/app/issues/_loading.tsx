import { Button } from "@radix-ui/themes";
import TableSkeleton from "./TableSkeleton";
import Link from "next/link";

const loading = function () {
	return (
		<div>
			<div className="mb-3">
				<Button>
					<Link href="/issues/new">New Issue</Link>
				</Button>
			</div>
			<TableSkeleton />
		</div>
	);
};

export default loading;
