import { Heading, Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

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
