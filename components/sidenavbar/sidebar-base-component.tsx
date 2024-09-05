"use client"
import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"
import React, { useState, createContext, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import NavbarMobile from "./navbar-mobile"
import Modal from "../ui/modals/modal"
import NoPermissionModal from "../ui/modals/no-permission-modal"
import { getUserPermissions } from "@/lib/server-actions"

interface Links {
    label: string
    href: string
    activeLink: string
    permission: string
    tour?: string
    icon: React.JSX.Element | React.ReactNode
}

interface SidebarContextProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}: {
    children: React.ReactNode
    open?: boolean
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    animate?: boolean
}) => {
    const [openState, setOpenState] = useState(false)

    const open = openProp !== undefined ? openProp : openState
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState
    return (
        <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode
    open?: boolean
    setOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined
    animate?: boolean
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    )
}

type SidebarBodyProps = React.ComponentProps<typeof motion.div> & {
    authenticatedUser: any
    works: any
}
export const SidebarBody: React.FC<SidebarBodyProps> = ({
    authenticatedUser,
    works,
    ...props
}) => {
    return (
        <>
            <DesktopSidebar {...props} className="hidden md:sticky md:top-0" />
            <NavbarMobile authenticatedUser={authenticatedUser} works={works} />
        </>
    )
}

const DesktopSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebar()
    return (
        <>
            <motion.div
                className={cn(
                    "borderColor hidden h-screen w-[200px] flex-shrink-0 border-r py-4 md:flex md:flex-col",
                    className,
                )}
                initial={false}
                animate={{
                    width: animate ? (open ? "250px" : "60px") : "250px",
                    borderRadius: animate
                        ? open
                            ? "0"
                            : "0 16px 16px 0px"
                        : "16px",
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                {...props}
            >
                {children}
            </motion.div>
        </>
    )
}
export const SidebarLink = ({
    link,
    className,
    ...props
}: {
    link: Links
    className?: string
    props?: LinkProps
}) => {
    const pathname = usePathname()
    const { open, animate } = useSidebar()
    const router = useRouter()
    const [isPermissionModalVisible, setIsPermissionModalVisible] =
        useState(false)
    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const permission = link.permission
        const user = await getUserPermissions()
        if (user.role === "EMPLOYER") {
            router.push(`${link.href}`)
        } else {
            if (link.permission === "all") {
                router.push(`${link.href}`)
            } else if (!user.permissions[permission]) {
                setIsPermissionModalVisible(true)
            } else {
                router.push(`${link.href}`)
            }
        }
    }
    return (
        <>
            <Link
                href={link.href}
                className={cn(
                    "group/sidebar link flex items-center justify-start gap-4 border-b border-white/10 py-4 hover:text-first-muted",
                    pathname === `${link.activeLink}`
                        ? "font-extrabold text-first-muted"
                        : "text-myText-muted",
                    link.tour ? link.tour : "",
                    className,
                )}
                onClick={handleClick}
                {...props}
            >
                {link.icon}

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
                    {link.label}
                </motion.span>
            </Link>
            <Modal
                visible={isPermissionModalVisible}
                setVisible={setIsPermissionModalVisible}
            >
                <NoPermissionModal link={link.label} />
            </Modal>
        </>
    )
}
