"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IssueSchema } from "@src/utils/zod.validation";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Button, Callout, Flex, Spinner, TextField } from "@radix-ui/themes";
import { ErrorMessage, Skeleton } from "@src/components";
import { Suspense, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GoIssueOpened } from "react-icons/go";
import { RiMailAddLine } from "react-icons/ri";
// import SimpleMDE from "react-simplemde-editor";
import { Issue } from "@prisma/client";
// import AssigneeSelect from "@src/components/AssigneeSelect";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import toast from "react-hot-toast";

type IssueFormData = z.infer<typeof IssueSchema>;
const IssueForm = function ({ issue }: { issue?: Issue }) {
	// const [state, formAction] = useFormState(createIssue, null);
	// console.log(window.location);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(IssueSchema),
	});

	// ! BAD IDEA!!
	// useEffect(() => {
	// 	if (issue) {
	// 		reset(issue);
	// 	}
	// }, []);

	// console.log(window);
	const submitIssue = async function (data: IssueFormData) {
		const action = issue
			? axios.patch(`/api/issues/${issue.id}`, data)
			: axios.post("/api/issues", data);

		try {
			setIsSubmitting(true);
			const {
				data: { message },
			} = await action;
			toast.success(message);

			// revalidatePath("/issues");
			router.push("/issues");
			router.refresh();
		} catch (error) {
			setError("An unexepted error occurred");
			if (axios.isAxiosError(error)) {
				toast.error(
					error.response?.data?.message || "Could not create issue right now"
				);
			} else {
				throw new Error("different error than axios");
			}
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
				<Flex gap="2" align="center">
					<TextField.Root
						placeholder="Issue title"
						{...register("title")}
						defaultValue={issue?.title}
						className="flex-1"
					>
						<TextField.Slot>
							<GoIssueOpened height="16" width="16" />
						</TextField.Slot>
					</TextField.Root>
					{/* <AssigneeSelect /> */}
				</Flex>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => (
						<SimpleMDE placeholder="Describe the issue" {...field} />
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button type="submit" disabled={isSubmitting}>
					<Spinner loading={isSubmitting}>
						<RiMailAddLine />
					</Spinner>
					{issue ? "Update" : "Create"} issue
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
