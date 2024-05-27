import prisma from "@/prisma/client";
import { connectDB } from "@src/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		await connectDB();
		const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

		return NextResponse.json({ users }, { status: 200 });
	} catch (error) {
		NextResponse.json(
			{ message: "An error occured! Please try later" },
			{ status: 500 }
		);
	}
}
