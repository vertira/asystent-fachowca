"use client"
import { CheckCircle2 } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export const Step = ({
    number,
    title,
    description,
    isActive,
    isCompleted,
    activeStep,
}: {
    number: number
    title: string
    description: string
    isActive: boolean
    isCompleted: boolean
    activeStep: number
}) => {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    if (isMobile) {
        const shouldDisplayMobile =
            activeStep === number - 1 ||
            activeStep === number ||
            activeStep === number + 1

        if (!shouldDisplayMobile) {
            return null
        }
    }
    return (
        <div
            className={`flex select-none flex-col items-center justify-center px-4 md:mb-4 md:flex-row md:justify-start ${
                isActive
                    ? "text-neutral-50"
                    : isCompleted
                      ? "text-neutral-400"
                      : "text-neutral-300"
            }`}
        >
            <div
                className={`relative flex min-h-8 min-w-8 items-center justify-center overflow-hidden rounded-full border bg-transparent text-neutral-50 md:mr-3 ${
                    isActive
                        ? "border-none text-black"
                        : isCompleted
                          ? "border-none text-neutral-50"
                          : "text-gray-500"
                }`}
            >
                {isActive ? (
                    <>
                        <span className="absolute inset-[-100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#eef2ff_0%,#ff7400_50%,#eef2ff_100%)]" />
                        <span className="inline-flex h-[95%] w-[95%] cursor-pointer items-center justify-center rounded-full bg-cardBackground/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            {isCompleted ? (
                                <CheckCircle2 size={16} />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center">
                                    {number}
                                </span>
                            )}
                        </span>
                    </>
                ) : isCompleted ? (
                    <CheckCircle2 size={16} />
                ) : (
                    number
                )}
            </div>
            <div>
                <p className="text-center text-sm font-semibold md:text-start md:text-base">
                    {title}
                </p>
                <p className="hidden text-sm md:block">{description}</p>
            </div>
        </div>
    )
}
