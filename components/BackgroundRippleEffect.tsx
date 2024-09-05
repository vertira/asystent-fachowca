"use client"
import React, { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

export const BackgroundCellAnimation = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="relative flex h-full justify-center overflow-hidden bg-myBackground">
            <BackgroundCellCore />
            <div className="relative z-50 h-full w-full select-none xl:w-4/5">
                {children}
            </div>
        </div>
    )
}

const BackgroundCellCore = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const ref = useRef<any>(null)

    const handleMouseMove = (event: any) => {
        const rect = ref.current && ref.current.getBoundingClientRect()
        setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        })
    }

    const size = 200
    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 z-[50] h-full"
        >
            <div className="absolute inset-y-0 h-full overflow-hidden">
                <div className="pointer-events-none absolute top-0 z-40 h-screen w-full bg-myBackground [mask-image:linear-gradient(to_top,transparent,white)]"></div>
                <div
                    className="absolute inset-0 z-[41] bg-transparent"
                    style={{
                        maskImage: `radial-gradient(
            ${size / 4}px circle at center,
           white, transparent
          )`,
                        WebkitMaskImage: `radial-gradient(
          ${size / 4}px circle at center,
          white, transparent
        )`,
                        WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
                            mousePosition.y - size / 2
                        }px`,
                        WebkitMaskSize: `${size}px`,
                        maskSize: `${size}px`,
                        pointerEvents: "none",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                    }}
                ></div>
                {/* <Pattern className="opacity-[1]" cellClassName="border-myText-muted/20 rounded-xl"  /> */}
            </div>
        </div>
    )
}

//
