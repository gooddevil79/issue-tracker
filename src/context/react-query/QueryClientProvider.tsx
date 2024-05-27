"use client";

import {
	QueryClient,
	QueryClientProvider as RQProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const client = new QueryClient({ defaultOptions: { queries: { retry: 3 } } });

const QueryClientProvider = function ({ children }: PropsWithChildren) {
	return <RQProvider client={client}>{children}</RQProvider>;
};

export default QueryClientProvider;
