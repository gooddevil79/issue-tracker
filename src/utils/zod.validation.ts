import { z } from "zod";

// issues
const IssueSchema = z.object({
	title: z.string().min(1, "Title is requierd").max(255),
	description: z.string().min(1, "Description is requierd"),
});

export { IssueSchema };
