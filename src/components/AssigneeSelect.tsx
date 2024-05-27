"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { Skeleton } from "@src/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = function () {
	const queryFn = async function () {
		return axios.get("/api/users").then(({ data }) => data.users);
	};
	const {
		data: users,
		error,
		isLoading,
	} = useQuery<User[]>({
		queryFn,
		queryKey: ["users"],
		staleTime: 60 * 1000,
	});

	if (error) {
		return null;
	}
	if (isLoading) {
		return <Skeleton height="2rem" />;
	}

	return (
		<Select.Root>
			<Select.Trigger placeholder="Assign to ..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions :</Select.Label>
					{users?.map(u => (
						<Select.Item value={u.id} key={u.id}>
							<p>{u.name}</p>
							{/* <small>{u.email}</small> */}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;
