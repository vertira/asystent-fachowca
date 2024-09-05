"use client"
import { getUserMessages } from "@/lib/server-actions"
import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Image from "next/image"
import SpinnerCustom from "../ui/spinner-custom"
import Spinner from "../ui/spinner"
import { Badge } from "../ui/badge"
const fetcher = async () => {
    return await getUserMessages()
}
export default function Messages() {
    const { data, error } = useSWR("getUserMessages", fetcher, {
        refreshInterval: 1000,
    })
    if (!data) return <Spinner />
    return (
        <ul className="flex-1 overflow-y-auto">
            {data?.map((message) => {
                return (
                    <li
                        className="borderColor flex flex-col gap-5 border-b p-4 last:border-none"
                        key={message.id}
                    >
                        <div className="flex items-center gap-3 self-start">
                            <div className="relative">
                                <Avatar className="self-start ring-1 ring-first-muted ring-offset-2 ring-offset-myBackground">
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
                                    className={` ${
                                        message.sender.role === "EMPLOYER"
                                            ? "bg-green-700"
                                            : "bg-indigo-700"
                                    } absolute -top-3 left-6 -z-10`}
                                >
                                    {message.sender.role === "EMPLOYER"
                                        ? "BOSS"
                                        : "STAFF"}
                                </Badge>
                            </div>
                            <span className="mt-1 text-lg font-medium text-first-muted">
                                {message.sender.name}
                            </span>
                        </div>
                        <p className="pointer-events-auto select-text text-balance px-2 text-sm leading-6">
                            {message.content}
                        </p>
                    </li>
                )
            })}
        </ul>
    )
}
