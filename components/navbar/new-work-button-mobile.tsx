"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import UpgradeMembership from "../upgrade-membership"
import { isUserPremium } from "@/lib/server-actions"
import { NewWorkProps } from "./navbar-links"
import Modal from "../ui/modals/modal"
import { CalendarPlus2 } from "lucide-react"

const NewWorkLink = ({ works, authenticatedUser }: NewWorkProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false)

    const handleClick = async () => {
        const isPremium = await isUserPremium()
        if (!isPremium && works.length >= 2) {
            setIsUpgradeModalVisible(true)
        } else {
            router.push("/new-work")
        }
    }

    return (
        <div>
            <button
                className={`link ${
                    pathname === "/new-work"
                        ? "bg-cardBackground text-first-muted"
                        : ""
                } tour-mobile-new-work flex flex-col items-center rounded-md px-3 py-2 text-myText-muted transition-all hover:text-first-muted md:flex-row md:gap-3`}
                onClick={handleClick}
            >
                <CalendarPlus2 size={17} />
                <span className="hidden md:block">Nowa Praca</span>
                <span className="text-xs md:hidden md:text-base">Dodaj</span>
            </button>
            <Modal
                visible={isUpgradeModalVisible}
                setVisible={setIsUpgradeModalVisible}
            >
                <UpgradeMembership authenticatedUser={authenticatedUser} />
            </Modal>
        </div>
    )
}

export default NewWorkLink
