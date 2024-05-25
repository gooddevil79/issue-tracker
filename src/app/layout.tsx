import { Container, Theme } from "@radix-ui/themes";
import NavBar from "@src/components/NavBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
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
				<Theme accentColor="iris" radius="large" scaling="105%">
					<NavBar />
					<main className="px-5">
						<Container>{children}</Container>
					</main>
					{/* <ThemePanel /> */}
				</Theme>
			</body>
		</html>
	);
}
