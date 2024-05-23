import { NextRequest, NextResponse } from "next/server";

import { createIssueSchema } from "@src/utils/zod.validation";
import { connectDB } from "@src/lib/connectDB";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = createIssueSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(
			{ message: "Validation faild", errors: validation.error.errors },
			{ status: 400 }
		);
	}

	try {
		await connectDB();
		const newIssue = await prisma.issue.create({
			data: { title: body.title, description: body.description },
		});
		return NextResponse.json(
			{ message: "Issue created", newIssue },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong on server!", error },
			{ status: 500 }
		);
	}
}
