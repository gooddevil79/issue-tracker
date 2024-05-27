"use client";

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { PiWarningCircle } from "react-icons/pi";

const DeleteIssueButton = function ({ issueId }: { issueId: string }) {
	const [error, setError] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const res = await axios.delete(`/api/issues/${issueId}`);
			router.push("/issues");
			router.refresh();
		} catch (error) {
			setError(true);
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button
						color="tomato"
						className="cursor-pointer"
						disabled={isDeleting}
					>
						<Spinner loading={isDeleting}>
							<AiOutlineDelete />
						</Spinner>
						{isDeleting ? "Deleting" : "Delete Issue"}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title className="select-none">
						Confirm Deletion
					</AlertDialog.Title>
					<AlertDialog.Description>
						<p>Are you sure you want to delete this issue?</p>
						<Flex align="center" gap="1">
							<PiWarningCircle color="red" />
							<small>This action can not be undone</small>
						</Flex>
					</AlertDialog.Description>
					<AlertDialog.Action>
						<Flex gap="2" mt="3 ">
							<Button
								variant="soft"
								color="gray"
								className="cursor-pointer"
								disabled={isDeleting}
							>
								Cancel
							</Button>
							<Button
								color="tomato"
								className="cursor-pointer"
								onClick={handleDelete}
								disabled={isDeleting}
								loading={isDeleting}
							>
								Delete
							</Button>
						</Flex>
					</AlertDialog.Action>
				</AlertDialog.Content>
			</AlertDialog.Root>
			{error && (
				<AlertDialog.Root open={error}>
					<AlertDialog.Content>
						<AlertDialog.Title>Error</AlertDialog.Title>
						<AlertDialog.Description>
							This issue could not be deleted!
						</AlertDialog.Description>
						<AlertDialog.Action>
							<Button
								color="gray"
								variant="soft"
								onClick={() => setError(false)}
							>
								Ok
							</Button>
						</AlertDialog.Action>
					</AlertDialog.Content>
				</AlertDialog.Root>
			)}
		</>
	);
};

export default DeleteIssueButton;