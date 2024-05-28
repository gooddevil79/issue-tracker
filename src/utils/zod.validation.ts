import { z } from "zod";

// issues
const IssueSchema = z.object({
	title: z.string().min(3, "Title is requierd").max(255),
	description: z.string().min(3, "Description is requierd"),
	assignedToUserId: z
		.string()
		.min(1, "AssignedToUser is requierd")
		.optional()
		.nullable(),
});
const PatchIssueSchema = z.object({
	title: z.string().min(1, "Title is requierd").max(255).optional(),
	description: z.string().min(1, "Description is requierd").optional(),
	assignedToUserId: z
		.string()
		.min(1, "AssignedToUser is requierd")
		.optional()
		.nullable(),
});

export { IssueSchema, PatchIssueSchema };
