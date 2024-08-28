"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { PiGear } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { useState } from "react";

interface AvatarProps {
	authenticatedUser?: any;
}

const AvatarMenu: React.FC<AvatarProps> = () => {
	const pathname = usePathname();
	return (
		<div className="absolute top-4 right-4 z-[200] md:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger className="focus:outline-none relative">
					<Settings size={32} className="text-first-muted" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-52 space-y-1 p-2 borderColor bg-cardBackground text-myText">
					<DropdownMenuItem asChild>
						<Link
							href="/settings"
							className={`link ${
								pathname === "/settings" ? "bg-myBackground text-first" : ""
							} flex gap-2 w-full items-center rounded-md px-4 py-3 transition-all hover:text-first`}
						>
							<PiGear className="text-xl text-first-muted" />
							Ustawienia
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator className="px-2 borderColor" />
					<DropdownMenuItem asChild>
						<button
							className="flex gap-2 w-full items-center rounded-md px-4 py-3 transition-all hover:text-first"
							onClick={() => signOut()}
						>
							<CiLogout className="text-xl text-first-muted" />
							Wyloguj się
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default AvatarMenu;
