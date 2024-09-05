import { FaBriefcase, FaHome, FaPlus, FaWarehouse } from "react-icons/fa"
import { CalendarPlus2, History } from "lucide-react"
import { CiLogout, CiSettings } from "react-icons/ci"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { useSidebar } from "./sidebar-base-component"
import { NewWorkProps } from "../navbar/navbar-links"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { getUserPermissions, isUserPremium } from "@/lib/server-actions"
import Modal from "../ui/modals/modal"
import UpgradeMembership from "../upgrade-membership"
import NoPermissionModal from "../ui/modals/no-permission-modal"
import { signOut } from "next-auth/react"
export const links = [
    {
        activeLink: "/",
        permission: "all",
        label: "Strona główna",
        href: "/",
        icon: <FaHome className="ml-4 h-7 w-7 flex-shrink-0" />,
    },
    {
        activeLink: "/upcoming-works",
        permission: "all",
        label: "Zaplanowane prace",
        href: "/upcoming-works",
        tour: "tour-upcoming-works",
        icon: <FaBriefcase className="ml-4 h-7 w-7 flex-shrink-0" />,
    },
    {
        activeLink: "/my-works",
        permission: "editWork",
        label: "Edytowanie prac",
        href: "/my-works",
        tour: "tour-edit-work",
        icon: <History className="ml-4 h-7 w-7 flex-shrink-0" />,
    },
    {
        activeLink: "/warehouse",
        permission: "warehouse",
        label: "Magazyn",
        href: "/warehouse",
        tour: "tour-warehouse",
        icon: <FaWarehouse className="ml-4 h-7 w-7 flex-shrink-0" />,
    },
]
export const NewWorkSideBar = ({ works, authenticatedUser }: NewWorkProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const { open, animate } = useSidebar()
    const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false)
    const [hasPermission, setHasPermission] = useState(true)

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const isPremium = await isUserPremium()
        const user = await getUserPermissions()
        if (!isPremium && works.length >= 2) {
            setIsUpgradeModalVisible(true)
        } else if (!user.permissions.createWork) {
            setHasPermission(false)
            setIsUpgradeModalVisible(true)
        } else {
            router.push("/new-work")
        }
    }

    return (
        <>
            <Link
                className={`link ${
                    pathname === "/new-work"
                        ? "font-extrabold text-first-muted"
                        : "text-myText-muted"
                } group/sidebar link tour-new-work flex items-center justify-start gap-4 border-b border-white/10 py-4 hover:text-first-muted`}
                onClick={handleClick}
                href="/new-work"
            >
                <CalendarPlus2 className="ml-4 h-7 w-7 flex-shrink-0 group-hover/link:text-first-muted" />
                <motion.span
                    animate={{
                        display: animate
                            ? open
                                ? "inline-block"
                                : "none"
                            : "inline-block",
                        opacity: animate ? (open ? 1 : 0) : 1,
                    }}
                    initial={false}
                    className="!m-0 inline-block whitespace-pre !p-0 text-base transition duration-150 group-hover/sidebar:translate-x-1 group-hover/sidebar:font-extrabold group-hover/sidebar:text-myText"
                >
                    Nowa praca
                </motion.span>
            </Link>
            <Modal
                visible={isUpgradeModalVisible}
                setVisible={setIsUpgradeModalVisible}
            >
                {!hasPermission ? (
                    <NoPermissionModal link="Nowa praca" />
                ) : (
                    <UpgradeMembership authenticatedUser={authenticatedUser} />
                )}
            </Modal>
        </>
    )
}
export const Logo = () => {
    const { open, animate } = useSidebar()
    return (
        <Link
            href="/"
            className="borderColor flex items-center justify-start gap-2 border-b py-4"
        >
            <Image
                src="/icons/favicon.ico"
                alt="Logo"
                width={72}
                height={72}
                className="ml-4 h-7 w-7 flex-shrink-0"
            />

            <motion.span
                animate={{
                    display: animate
                        ? open
                            ? "inline-block"
                            : "none"
                        : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                initial={false}
                className="!m-0 inline-block whitespace-pre !p-0 text-lg font-extrabold"
            >
                Asystent Fachowca
            </motion.span>
        </Link>
    )
}
export const Settings = () => {
    const { open, animate } = useSidebar()
    const pathname = usePathname()
    return (
        <Link
            href="/settings"
            className={`link ${
                pathname === "/settings"
                    ? "font-extrabold text-first-muted"
                    : "text-myText-muted"
            } group/link link tour-settings flex items-center justify-start gap-2 border-b border-white/10 py-4 hover:text-first-muted`}
        >
            <CiSettings className="ml-4 h-7 w-7 flex-shrink-0 group-hover/link:text-first-muted" />

            <motion.span
                animate={{
                    display: animate
                        ? open
                            ? "inline-block"
                            : "none"
                        : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                initial={false}
                className="!m-0 inline-block whitespace-pre !p-0 text-lg font-extrabold text-myText-muted transition duration-150 group-hover/link:translate-x-1 group-hover/link:text-myText"
            >
                Ustawienia
            </motion.span>
        </Link>
    )
}
export const SignOut = () => {
    const { open, animate } = useSidebar()
    return (
        <button
            onClick={() => signOut()}
            className="group/link flex items-center justify-start gap-2 py-4"
        >
            <CiLogout className="ml-4 h-7 w-7 flex-shrink-0 group-hover/link:text-first-muted" />

            <motion.span
                animate={{
                    display: animate
                        ? open
                            ? "inline-block"
                            : "none"
                        : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                initial={false}
                className="!m-0 inline-block whitespace-pre !p-0 text-lg font-extrabold text-myText-muted transition duration-150 group-hover/link:translate-x-1 group-hover/link:text-myText"
            >
                Wyloguj się
            </motion.span>
        </button>
    )
}
export const AvatarSideBar = ({
    authenticatedUser,
}: {
    authenticatedUser: any
}) => {
    const { open, animate } = useSidebar()
    return (
        <div className="group/link mt-10 flex flex-shrink-0 items-center justify-start gap-4">
            <Avatar className="ml-[10px] flex-shrink-0 ring-1 ring-first-muted ring-offset-2 ring-offset-myBackground group-hover/link:text-first-muted">
                <AvatarImage src={authenticatedUser.user.image} />
                <AvatarFallback>
                    <Image
                        src="/favicon.ico"
                        width={48}
                        height={48}
                        alt="avatar logo fallback"
                        className="h-7 w-7 flex-shrink-0"
                    />
                </AvatarFallback>
            </Avatar>
            <motion.div
                className="flex flex-col items-start text-myText"
                animate={{
                    display: animate
                        ? open
                            ? "inline-block"
                            : "none"
                        : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                initial={false}
            >
                <div className="flex flex-col">
                    <span className="text-base font-medium">
                        {authenticatedUser.user.name}
                    </span>
                    <span className="text-sm text-myText-muted">
                        {authenticatedUser.user.email}
                    </span>
                </div>
            </motion.div>
        </div>
    )
}
