"use client"
import { useMotionValue } from "framer-motion"
import React, { useState, useEffect } from "react"
import { useMotionTemplate, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const EvervaultCard = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    let mouseX = useMotionValue(0)
    let mouseY = useMotionValue(0)

    function onMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            className={cn(
                "relative flex h-full w-full items-center justify-center bg-transparent",
                className,
            )}
        >
            <div
                onMouseMove={onMouseMove}
                className="group/card borderColor relative flex h-full w-full items-center justify-start overflow-hidden rounded-2xl border bg-transparent"
            >
                <CardPattern mouseX={mouseX} mouseY={mouseY} />
                <div className="relative z-10 flex w-full items-center justify-center">
                    <div className="relative flex h-full w-full items-center justify-center rounded-full text-3xl font-bold">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

function CardPattern({ mouseX, mouseY }: any) {
    let maskImage = useMotionTemplate`radial-gradient(2500px at ${mouseX}px ${mouseY}px, white, transparent)`
    let style = { maskImage, WebkitMaskImage: maskImage }

    return (
        <div className="pointer-events-none">
            <div className="absolute inset-0 rounded-xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
            <motion.div
                className="glassPattern5 absolute inset-0 rounded-xl opacity-30 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100 lg:opacity-0"
                style={style}
            />
            <motion.div
                className="absolute inset-0 rounded-xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
                style={style}
            ></motion.div>
        </div>
    )
}
