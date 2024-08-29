"use client";
import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar-base-component";
import {
	AvatarSideBar,
	Logo,
	NewWorkSideBar,
	Settings,
	SignOut,
	links,
} from "./custom-routes-links";
export function SideBarMotion({
	children,
	authenticatedUser,
	works,
}: {
	children: ReactNode;
	authenticatedUser: any;
	works: any;
}) {
	const [open, setOpen] = useState(false);
	return (
		<div
			className={cn(
				"flex flex-col-reverse md:flex-row w-full flex-1 relative"
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody authenticatedUser={authenticatedUser} works={works}>
					<div
						className={`w-full h-full bg-cardBackground/70 -z-10 absolute ${
							open ? "rounded-none" : "rounded-r-2xl"
						} top-0 left-0`}
					></div>
					<div
						className={`glassPattern4 w-full h-full absolute ${
							open ? "rounded-none" : "rounded-r-2xl"
						} top-0 left-0`}
					></div>
					<Logo />
					<AvatarSideBar authenticatedUser={authenticatedUser} />
					<div className="flex flex-col flex-1 mt-20">
						<div className="flex flex-col">
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
						</div>
							<NewWorkSideBar
								authenticatedUser={authenticatedUser}
								works={works}
							/>
					</div>
					<div className="border-t borderColor ">
						<Settings />
						<SignOut />
					</div>
				</SidebarBody>
			</Sidebar>
			{children}
		</div>
	);
}
