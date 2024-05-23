"use client";

import { Button, TextField } from "@radix-ui/themes";

import { GoIssueOpened } from "react-icons/go";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

const IssueForm = function () {
	return (
		<>
			<TextField.Root placeholder="Issue title">
				<TextField.Slot>
					<GoIssueOpened height="16" width="16" />
				</TextField.Slot>
			</TextField.Root>
			<SimpleMDE placeholder="Describe the issue" />
			<Button>Submit new Issue</Button>
		</>
	);
};

export default IssueForm;
