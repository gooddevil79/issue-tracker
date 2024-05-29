"use client";

import {
	DoubleArrowLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
	itemCount: number;
	pageSize: number;
	currentPage: number;
}
const Pagination = function ({ itemCount, pageSize, currentPage }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const pageCount = Math.ceil(itemCount / pageSize);
	if (pageCount <= 1) return null;

	const changePage = function (page: number) {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());

		router.push("?" + params.toString());
	};

	return (
		<Flex align="center" gap="2">
			<Text>
				Page {currentPage} of {pageCount}
			</Text>
			<Flex gap="1">
				<Button
					color="gray"
					variant="outline"
					disabled={currentPage === 1}
					size="1"
					onClick={() => changePage(1)}
				>
					<DoubleArrowLeftIcon />
				</Button>
				<Button
					color="gray"
					variant="outline"
					disabled={currentPage === 1}
					size="1"
					onClick={() => changePage(currentPage - 1)}
				>
					<ChevronLeftIcon />
				</Button>
				<Button
					color="gray"
					variant="outline"
					disabled={currentPage === pageCount}
					size="1"
					onClick={() => changePage(currentPage + 1)}
				>
					<ChevronRightIcon />
				</Button>
				<Button
					color="gray"
					variant="outline"
					disabled={currentPage === pageCount}
					size="1"
					onClick={() => changePage(pageCount)}
				>
					<DoubleArrowRightIcon />
				</Button>
			</Flex>
		</Flex>
	);
};

export default Pagination;
