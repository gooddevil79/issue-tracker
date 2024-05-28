import { NextRequest, NextResponse } from "next/server";

import { IssueSchema } from "@src/utils/zod.validation";
import { connectDB } from "@src/lib/connectDB";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
	const session = await getServerSession();
	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}

	const body = await request.json();
	const { title, description, assignedToUserId } = body;
	const validation = IssueSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(
			{ message: "Validation faild", errors: validation.error.errors },
			{ status: 400 }
		);
	}

	if (assignedToUserId) {
		const user = await prisma.issue.findUnique({
			where: { id: assignedToUserId },
		});
		if (!user)
			return NextResponse.json(
				{ message: "Could not find user to assign" },
				{ status: 400 }
			);
	}

	try {
		await connectDB();
		const newIssue = await prisma.issue.create({
			data: { title, description, assignedToUserId },
		});
		return NextResponse.json(
			{ message: "Issue created", newIssue },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong on server! Please try later ", error },
			{ status: 500 }
		);
	}
}
