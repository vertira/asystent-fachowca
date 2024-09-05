"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { FaHome, FaBriefcase, FaWarehouse } from "react-icons/fa"
import { History } from "lucide-react"
import { CiLogout, CiSettings } from "react-icons/ci"
import { Button } from "../ui/button"
import NewWorkLink from "./new-work-button-mobile"
import Search from "./search"
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Image from "next/image"
export interface NewWorkProps {
    authenticatedUser?: any
    works?: any
}
function NavbarLinksDektop({ authenticatedUser, works }: NewWorkProps) {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <>
            <div>
                <div className="px-5 pt-4">
                    <div className="flex w-full items-center justify-start gap-4">
                        <Avatar className="ring-1 ring-first-muted ring-offset-2 ring-offset-myBackground">
                            <AvatarImage src={authenticatedUser.user.image} />
                            <AvatarFallback>
                                <Image
                                    src="/favicon.ico"
                                    width={48}
                                    height={48}
                                    alt="avatar logo fallback"
                                />
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col items-start text-myText">
                            <span className="text-sm font-medium">
                                {authenticatedUser.user.name}
                            </span>
                            <span className="text-xs text-myText-muted">
                                {authenticatedUser.user.email}
                            </span>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                    <ul className="space-y-2 px-4 text-base font-medium">
                        <li>
                            <Link
                                href="/"
                                className={`link ${
                                    pathname === "/"
                                        ? "bg-cardBackground text-first-muted"
                                        : "text-myText-muted"
                                } flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:text-first-muted`}
                            >
                                <FaHome />
                                Strona Główna
                            </Link>
                        </li>
                        <li>
                            <NewWorkLink
                                works={works}
                                authenticatedUser={authenticatedUser}
                            />
                        </li>
                        <li>
                            <Link
                                href="/upcoming-works"
                                className={`link ${
                                    pathname === "/upcoming-works"
                                        ? "bg-cardBackground text-first-muted"
                                        : "text-myText-muted"
                                } flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:text-first-muted`}
                            >
                                <FaBriefcase />
                                Zaplanowane Prace
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/my-works"
                                className={`link ${
                                    pathname === "/my-works"
                                        ? "bg-cardBackground text-first-muted"
                                        : "text-myText-muted"
                                } flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:text-first-muted`}
                            >
                                <History size={16} />
                                Historia prac
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/warehouse"
                                className={`link ${
                                    pathname === "/warehouse"
                                        ? "bg-cardBackground text-first-muted"
                                        : "text-myText-muted"
                                } flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:text-first-muted`}
                            >
                                <FaWarehouse />
                                Magazyn
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center pt-4">
                    <Search />
                </div>
            </div>
            <div className="mt-auto flex flex-col gap-2 border-t border-myText-muted/30 px-4 py-4">
                <Link
                    href="/settings"
                    className="flex w-full items-center justify-center"
                >
                    <Button
                        variant="third"
                        className={`link text-base ${
                            pathname === "/settings"
                                ? "bg-cardBackground text-first-muted"
                                : ""
                        } flex w-full items-center gap-3 rounded-md px-3 py-2 text-myText-muted transition-all hover:text-first-muted`}
                    >
                        <CiSettings className="text-xl" />
                        Ustawienia
                    </Button>
                </Link>
                <Button
                    variant="third"
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-myText-muted transition-all hover:text-first-muted"
                    onClick={() => signOut()}
                >
                    <CiLogout className="text-xl" />
                    Wyloguj się
                </Button>
            </div>
        </>
    )
}
