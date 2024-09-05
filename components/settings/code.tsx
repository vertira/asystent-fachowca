"use client"
import React, { useEffect, useState, useCallback } from "react"
import { Button } from "../ui/button"
import { generateRegistrationCode } from "@/lib/server-actions"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"

export const Scrambles = ({
    registrationCodes,
    isPremium,
    employees,
}: {
    registrationCodes: any
    isPremium: any
    employees: any
}) => {
    const [code, setCode] = useState<string>("")
    const [textArray, setTextArray] = useState<string[]>([])
    const [activeText, setActiveText] = useState<number>(0)
    const [play, setPlay] = useState<boolean>(false)
    const router = useRouter()
    const filteredCodes =
        registrationCodes.filter((code: any) => code.used === false).length >= 3
    const disableButton = () => {
        if (isPremium && filteredCodes) {
            return true
        } else if (!isPremium && employees.length >= 1) {
            return true
        } else if (!isPremium && registrationCodes.length >= 1) {
            return true
        }
    }
    const shuffle = useCallback((word: string): string => {
        return word
            .split("")
            .sort(() => 0.5 - Math.random())
            .join("")
    }, [])

    const generateTextArray = useCallback(
        (code: string): string[] => {
            let textArray: string[] = []
            for (let i = code.length; i >= 0; i--) {
                let tmp = shuffle(code)
                tmp = tmp.slice(0, code.length - i)
                textArray.push(tmp)
            }
            for (let i = 0; i < 6; i++) {
                textArray.push(shuffle(code))
            }
            textArray.push(code)
            return textArray
        },
        [shuffle],
    )

    const click = useCallback(async () => {
        try {
            if (!isPremium && employees.length >= 1) {
                return toast({
                    variant: "destructive",
                    title: "Przejdź na premium, aby dodać więcej pracowników!",
                })
            } else {
                const genCode = await generateRegistrationCode()
                setCode(genCode)
                setTextArray(generateTextArray(genCode))
                setActiveText(0)
                setPlay(true)
            }
        } catch (error) {
            console.error("Błąd podczas generowania kodu:", error)
        } finally {
            router.refresh()
        }
    }, [generateTextArray])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null
        if (play && activeText < textArray.length - 1) {
            interval = setInterval(() => {
                setActiveText((prevActiveText) => prevActiveText + 1)
            }, 90)
        } else if (activeText === textArray.length - 1) {
            setPlay(false)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [play, activeText, textArray.length])

    return (
        <div className="flex flex-col justify-center gap-5 p-10">
            <div className="borderColor flex items-center justify-center rounded-3xl border-2 px-6 py-2 pt-4 text-4xl">
                <span className="font-extrabold leading-none text-first-muted">
                    {textArray[activeText] || "******"}
                </span>
            </div>
            <Button
                disabled={disableButton()}
                variant="ghostsecond"
                onClick={click}
                className="text-first-muted"
            >
                {code ? "Wygeneruj nowy kod" : "Wygeneruj kod"}
            </Button>
        </div>
    )
}
