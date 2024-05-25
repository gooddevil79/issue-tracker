import prisma from "@/prisma/client";
import { connectDB } from "@src/lib/connectDB";
import { IssueSchema } from "@src/utils/zod.validation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params: { issueId } }: { params: { issueId: string } }
) {
	try {
		const body = await request.json();
		const validation = IssueSchema.safeParse(body);

		if (!validation.success) {
			return NextResponse.json(validation?.error?.format(), { status: 400 });
		}

		await connectDB();

		const issue = await prisma.issue.findUnique({ where: { id: issueId } });

		if (!issue) {
			return NextResponse.json({ message: "Not found" }, { status: 400 });
		}

		const updatedIssue = await prisma.issue.update({
			where: { id: issueId },
			data: { title: body.title, description: body.description },
		});

		return NextResponse.json(
			{ message: "Issue updated succesfully", issue: updatedIssue },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message:
					"An error occurred: Something goes wrong on the server. Please try later",
			},
			{ status: 500 }
		);
	}
}