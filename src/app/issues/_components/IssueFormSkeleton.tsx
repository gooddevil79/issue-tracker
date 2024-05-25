import { Box } from "@radix-ui/themes";
import { Skeleton } from "@src/components";

const IssueFormSkeleton = function () {
	return (
		<Box className="max-w-xl">
			<Skeleton height="2rem" />
			<Skeleton height="20rem" className="mt-2" />
			<Skeleton height="2rem" width="9rem" className="mt-3" />
		</Box>
	);
};

export default IssueFormSkeleton;
