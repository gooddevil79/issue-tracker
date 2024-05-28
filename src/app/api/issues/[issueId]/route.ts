import prisma from "@/prisma/client";
import { connectDB } from "@src/lib/connectDB";
import { PatchIssueSchema } from "@src/utils/zod.validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params: { issueId } }: { params: { issueId: string } }
) {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}

	try {
		const body = await request.json();
		const { title, description, assignedToUserId } = body;
		const validation = PatchIssueSchema.safeParse(body);

		if (!validation.success) {
			return NextResponse.json(validation?.error?.format(), { status: 400 });
		}

		await connectDB();

		const issue = await prisma.issue.findUnique({ where: { id: issueId } });

		if (!issue) {
			return NextResponse.json({ message: "Not found" }, { status: 400 });
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

		const updatedIssue = await prisma.issue.update({
			where: { id: issueId },
			data: { title, description, assignedToUserId },
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

export async function DELETE(
	request: NextRequest,
	{ params: { issueId } }: { params: { issueId: string } }
) {
	const session = await getServerSession();

	if (!session) {
		return NextResponse.json({}, { status: 401 });
	}
	try {
		await connectDB();

		const issue = await prisma.issue.findUnique({ where: { id: issueId } });

		if (!issue) {
			return NextResponse.json({ message: "Not found" }, { status: 400 });
		}

		await prisma.issue.delete({
			where: { id: issueId },
		});

		return NextResponse.json(
			{ message: "Issue Deleted succesfully" },
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
