import { z } from "zod";

// issues
const createIssueSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().min(1),
});

export { createIssueSchema };
