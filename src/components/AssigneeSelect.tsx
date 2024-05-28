"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { Skeleton } from "@src/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AssigneeSelect = function ({ issue }: { issue: Issue }) {
	const { data: users, error, isLoading } = useUsers();

	if (error) {
		return null;
	}
	if (isLoading) {
		return <Skeleton height="2rem" />;
	}

	const handleAssign = async function (value: string) {
		try {
			const res = await axios.patch(`/api/issues/${issue.id}`, {
				assignedToUserId: value === "1" ? null : value,
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(
					error.response?.data?.message || "Could not do the action!"
				);
			}
		}
	};

	return (
		<Select.Root
			defaultValue={issue.assignedToUserId || "1"}
			onValueChange={handleAssign}
		>
			<Select.Trigger placeholder="Assign to..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions :</Select.Label>
					<Select.Item value={"1"}>UnAssign...</Select.Item>
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
const useUsers = () => {
	const queryFn = async function () {
		return axios.get("/api/users").then(({ data }) => data.users);
	};
	return useQuery<User[]>({
		queryFn,
		queryKey: ["users"],
		staleTime: 60 * 1000 * 30,
	});
};

export default AssigneeSelect;
