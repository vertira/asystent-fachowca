"use client";
import { getUserMessages } from "@/lib/server-actions";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import SpinnerCustom from "../ui/spinner-custom";
import Spinner from "../ui/spinner";
import { Badge } from "../ui/badge";
const fetcher = async () => {
	return await getUserMessages();
};
export default function Messages() {
	const { data, error } = useSWR("getUserMessages", fetcher, {
		refreshInterval: 1000,
	});
	if (!data) return <Spinner />;
	return (
		<ul className="flex-1 overflow-y-auto">
			{data?.map((message) => {
				return (
					<li
						className="border-b borderColor p-4 flex flex-col last:border-none gap-5"
						key={message.id}
					>
						<div className="flex self-start items-center gap-3">
							<div className="relative">
								<Avatar className="ring-1 ring-offset-2 ring-offset-myBackground ring-first-muted self-start">
									<AvatarImage src={message.sender.image} />
									<AvatarFallback>
										<Image
											src="/favicon.ico"
											width={48}
											height={48}
											alt="avatar logo fallback"
										/>
									</AvatarFallback>
								</Avatar>
								<Badge
									className={`
										${
											message.sender.role === "EMPLOYER"
												? "bg-green-700"
												: "bg-indigo-700"
										} absolute -top-3 -z-10 left-6
									`}
								>
									{message.sender.role === "EMPLOYER" ? "BOSS" : "STAFF"}
								</Badge>
							</div>
							<span className="text-lg font-medium text-first-muted mt-1">
								{message.sender.name}
							</span>
						</div>
						<p className="text-sm text-balance leading-6 px-2 pointer-events-auto select-text">
							{message.content}
						</p>
					</li>
				);
			})}
		</ul>
	);
}
