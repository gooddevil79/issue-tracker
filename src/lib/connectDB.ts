import prisma from "@/prisma/client";

export const connectDB = async () => {
	try {
		await prisma.$connect();
	} catch (error) {
		throw new Error("Faild to connect!");
	}
};
