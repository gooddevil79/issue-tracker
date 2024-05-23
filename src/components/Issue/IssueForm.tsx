"use client";

import axios from "axios";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { GoIssueOpened } from "react-icons/go";
import SimpleMDE from "react-simplemde-editor";

import { createIssueSchema } from "@src/utils/zod.validation";

import "easymde/dist/easymde.min.css";

type IssueForm = z.infer<typeof createIssueSchema>;

const IssueForm = function () {
	// const [state, formAction] = useFormState(createIssue, null);
	const [error, setError] = useState("");
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});

	const submitIssue = async function (data: IssueForm) {
		try {
			await axios.post("/api/issues", data);
			router.push("/issues");
		} catch (error) {
			setError("An unexepted error occurred");
		}
	};

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root className="mb-3" color="red">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				onSubmit={handleSubmit(data => submitIssue(data))}
				className="space-y-2"
			>
				<TextField.Root placeholder="Issue title" {...register("title")}>
					<TextField.Slot>
						<GoIssueOpened height="16" width="16" />
					</TextField.Slot>
				</TextField.Root>
				{errors.title && (
					<Text color="red" as="p">
						{errors.title.message}
					</Text>
				)}
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Describe the issue" {...field} />
					)}
				/>
				{errors.title && (
					<Text color="red" as="p">
						{errors.title.message}
					</Text>
				)}

				<Button type="submit">Submit new Issue</Button>
			</form>
		</div>
	);
};

export default IssueForm;
