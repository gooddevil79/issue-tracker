"use client";

import { AiOutlineDelete } from "react-icons/ai";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import { PiWarningCircle } from "react-icons/pi";

const DeleteIssueButton = function ({ issueId }: { issueId: string }) {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color="tomato" className="cursor-pointer">
					<AiOutlineDelete />
					Delete Issue
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
					<Flex gap="2" mt="3">
						<Button variant="soft" color="gray" className="cursor-pointer">
							Cancel
						</Button>
						<Button color="tomato" className="cursor-pointer">
							Delete
						</Button>
					</Flex>
				</AlertDialog.Action>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};

export default DeleteIssueButton;
