"use server";

import prisma from "@/prisma/client";
import { connectDB } from "@src/lib/connectDB";

const createIssue = async (prevState, formData: FormData) => {
	const newIssue = {
		title: formData.get("title"),
		description: formData.get("description"),
	};
	try {
		await connectDB();
		prisma.issue.create({ data: newIssue });
	} catch (error) {}
};

export { createIssue };
