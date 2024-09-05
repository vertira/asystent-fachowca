"use client"
import React, { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Image from "next/image"
import { getUserById } from "@/lib/server-actions"
import SpinnerCustom from "../ui/spinner-custom"
import { Badge } from "../ui/badge"
type Employer = {
    image: string
    name: string
}
export default function StaffCardContent({
    employerId,
}: {
    employerId: string
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [employer, setEmployer] = useState<Employer | null>(null)
    useEffect(() => {
        const getEmployer = async () => {
            try {
                setIsLoading(true)
                const user = await getUserById(employerId)
                setEmployer(user)
            } catch {
                console.log("ERROR")
            } finally {
                setIsLoading(false)
            }
        }
        getEmployer()
    }, [])
    return (
        <>
            {isLoading ? (
                <SpinnerCustom />
            ) : (
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="z-10 ring-1 ring-first-muted ring-offset-2 ring-offset-myBackground">
                            <AvatarImage src={employer?.image} />
                            <AvatarFallback>
                                <SpinnerCustom />
                            </AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -top-2 z-0 translate-x-2/3 bg-green-700 px-1.5 py-[0.1px]">
                            BOSS
                        </Badge>
                    </div>
                    <span className="mt-1 text-2xl font-semibold leading-none tracking-tight text-myText">
                        {employer?.name}
                    </span>
                </div>
            )}
        </>
    )
}
