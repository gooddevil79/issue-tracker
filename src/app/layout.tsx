import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@src/components/NavBar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavBar />
				<main>{children}</main>
			</body>
		</html>
	);
}
