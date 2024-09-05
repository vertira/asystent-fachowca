"use client"

import { useState } from "react"
import { RxArrowRight } from "react-icons/rx"

import WorkModal from "../ui/modals/product-modal"
import Modal from "../ui/modals/modal"
import AuthContent from "../navbar/auth-content"
import Link from "next/link"
import { EvervaultCard } from "./hover-card"

interface WorkItemProps {
    work: any
    authenticatedUser: any
}

const WorkItem: React.FC<WorkItemProps> = ({ work }) => {
    const [currentWork, setCurrentWork] = useState<any>(null)

    const releaseDate = work.startDate && new Date(work.startDate)
    const endDate = work.endDate && new Date(work.endDate)
    const displayRangeDate = `${releaseDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    return (
        <EvervaultCard>
            <Link
                href={`/edit/${work.id}`}
                className="group/item w-full cursor-pointer px-2 py-8"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <RxArrowRight className="hidden group-hover/item:text-first-muted lg:block" />
                        <div className="ml-4 flex flex-col">
                            <div className="flex items-center gap-x-2">
                                <span className="text-sm">🚧</span>
                                <h1 className="text-base font-normal">
                                    {work.name}
                                </h1>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <span className="text-sm">📌</span>
                                <p className="w-3/4 pr-2 text-sm font-normal text-myText md:w-full md:text-base">
                                    {work.address}
                                </p>
                            </div>
                            <div className="hidden items-center gap-x-2 md:flex">
                                <div className="text-xs font-semibold text-myText md:text-base">
                                    <div className="flex items-center gap-x-1">
                                        📅 {displayRangeDate}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="text-base">🔧</span>
                                {work.categories.map((category: string) => (
                                    <div
                                        key={category}
                                        className="text-xs font-normal text-myText-muted"
                                    >
                                        <div className="flex max-w-full items-center gap-x-1">
                                            <div className="ml-1 text-myText">
                                                •
                                            </div>
                                            <span className="rounded-3xl bg-first px-2 py-px text-myBackground md:px-4">
                                                {category}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-sm"></div>
                </div>
            </Link>
        </EvervaultCard>
    )
}

export default WorkItem
