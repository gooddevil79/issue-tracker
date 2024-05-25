"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import { createIssueSchema } from "@src/utils/zod.validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GoIssueOpened } from "react-icons/go";
import { RiMailAddLine } from "react-icons/ri";
import { ErrorMessage } from "@src/components";
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const IssueForm = function () {
	// const [state, formAction] = useFormState(createIssue, null);
	// console.log(window.location);

	const [isSubmitting, setIsSubmitting] = useState(false);
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
	// console.log(window);
	const submitIssue = async function (data: IssueForm) {
		try {
			setIsSubmitting(true);
			await axios.post("/api/issues", data);
			// revalidatePath("/issues");
			router.push("/issues");
		} catch (error) {
			setError("An unexepted error occurred");
		} finally {
			setIsSubmitting(false);
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
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Describe the issue" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button type="submit" disabled={isSubmitting}>
					<Spinner loading={isSubmitting}>
						<RiMailAddLine />
					</Spinner>
					Submit new Issue
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
