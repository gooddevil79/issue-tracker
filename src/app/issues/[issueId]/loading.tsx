import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@src/components";

const IssueDetailsLoading = function () {
	return (
		<Box className="space-y-3">
			<Skeleton className="max-w-xl" />
			<Flex gap="4" align="center">
				<Skeleton width="5rem" />
				<Skeleton width="8rem" />
			</Flex>
			<Card className="prose">
				<Skeleton width="50%" />
				<Skeleton count={3} />
			</Card>
		</Box>
	);
};

export default IssueDetailsLoading;
