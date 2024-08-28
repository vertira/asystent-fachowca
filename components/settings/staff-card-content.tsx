"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { getUserById } from "@/lib/server-actions";
import SpinnerCustom from "../ui/spinner-custom";
import { Badge } from "../ui/badge";
type Employer = {
	image: string;
	name: string;
};
export default function StaffCardContent({
	employerId,
}: {
	employerId: string;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [employer, setEmployer] = useState<Employer | null>(null);
	useEffect(() => {
		const getEmployer = async () => {
			try {
				setIsLoading(true);
				const user = await getUserById(employerId);
				setEmployer(user);
			} catch {
				console.log("ERROR");
			} finally {
				setIsLoading(false);
			}
		};
		getEmployer();
	}, []);
	return (
		<>
			{isLoading ? (
				<SpinnerCustom />
			) : (
				<div className="flex items-center gap-3">
					<div className="relative">
						<Avatar className="ring-1 ring-offset-2 ring-offset-myBackground z-10 ring-first-muted">
							<AvatarImage src={employer?.image} />
							<AvatarFallback>
								<SpinnerCustom />
							</AvatarFallback>
						</Avatar>
						<Badge className="bg-green-700 absolute -top-2 translate-x-2/3 z-0 px-1.5 py-[0.1px]">
							BOSS
						</Badge>
					</div>
					<span className="text-myText text-2xl mt-1 font-semibold leading-none tracking-tight">
						{employer?.name}
					</span>
				</div>
			)}
		</>
	);
}
