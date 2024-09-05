"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { PiGear } from "react-icons/pi"
import { signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci"
import { usePathname } from "next/navigation"
import { Settings } from "lucide-react"

interface AvatarProps {
    authenticatedUser?: any
}

const AvatarMenu: React.FC<AvatarProps> = () => {
    const pathname = usePathname()
    return (
        <div className="tour-mobile-settings absolute right-4 top-4 z-[51] md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger className="relative focus:outline-none">
                    <Settings size={32} className="text-first-muted" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="borderColor w-52 space-y-1 bg-cardBackground p-2 text-myText">
                    <DropdownMenuItem asChild>
                        <Link
                            href="/settings"
                            className={`link ${
                                pathname === "/settings"
                                    ? "bg-myBackground text-first"
                                    : ""
                            } flex w-full items-center gap-2 rounded-md px-4 py-3 transition-all hover:text-first`}
                        >
                            <PiGear className="text-xl text-first-muted" />
                            Ustawienia
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="borderColor px-2" />
                    <DropdownMenuItem asChild>
                        <button
                            className="flex w-full items-center gap-2 rounded-md px-4 py-3 transition-all hover:text-first"
                            onClick={() => signOut()}
                        >
                            <CiLogout className="text-xl text-first-muted" />
                            Wyloguj się
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default AvatarMenu
