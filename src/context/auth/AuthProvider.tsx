"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const AuthProvider = function ({ children }: PropsWithChildren) {
	return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
