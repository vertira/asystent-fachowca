"use client"
import React, { useEffect } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { RiLockPasswordLine } from "react-icons/ri"
import { register } from "@/lib/user-actions"
import { useFormStatus, useFormState } from "react-dom"
import { useToast } from "@/components/ui/use-toast"
import SpinnerCustom from "./ui/spinner-custom"
import { Button } from "./ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"
import { Info } from "lucide-react"

export default function RegisterForm({
    handleButtonAuth,
    setIsCredentialsReg,
}: any) {
    const [error, formAction] = useFormState(register, null)
    const { toast } = useToast()
    const { pending } = useFormStatus()
    console.log(pending)
    useEffect(() => {
        if (error) {
            if (error.error === "USER") {
                toast({
                    variant: "destructive",
                    title: "Wystąpił problem z rejestracją",
                    description:
                        "Użytkownik z takim adresem email już istnieje!",
                })
            } else if (error.error === "SERVER") {
                toast({
                    variant: "destructive",
                    title: "Wystąpił problem z rejestracją",
                    description: "Wypełnij wszystkie pola!",
                })
            } else if (error.error === "CODE") {
                toast({
                    variant: "destructive",
                    title: "Wystąpił problem z rejestracją",
                    description:
                        "Nieprawidłowy, wykorzystany lub wygasły kod pracownika",
                })
            } else if (error.success === "SUCCESS") {
                toast({
                    title: "Pomyślnie zarejestrowano!",
                    description: "Zostałeś przekierowany do ekranu logowania",
                })
                handleButtonAuth()
            }
        }
    }, [error, formAction])
    return (
        <>
            <form
                action={formAction}
                className="flex w-full flex-col items-center gap-4"
            >
                <div className="flex w-3/4 max-w-sm flex-col items-start gap-1.5">
                    <Label htmlFor="firstname">Imię</Label>
                    <Input type="firstname" id="firstname" name="firstname" />
                </div>
                <div className="flex w-3/4 max-w-sm flex-col items-start gap-1.5">
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger onClick={(e) => e.preventDefault()}>
                                <div className="flex items-center">
                                    <Label htmlFor="registrationCode">
                                        Kod pracownika
                                    </Label>
                                    <sup>
                                        <Info
                                            size={12}
                                            className="text-first-muted"
                                        />
                                    </sup>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    Nie masz kodu? Nie ma problemu!
                                    <br /> Zostaniesz zarejestrowany jako szef
                                    swojego biznesu !
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Input
                        type="text"
                        id="registrationCode"
                        name="registrationCode"
                        placeholder="(opcjonalne)"
                    />
                </div>
                <div className="flex w-3/4 max-w-sm flex-col items-start gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" />
                </div>
                <div className="flex w-3/4 max-w-sm flex-col items-start gap-1.5">
                    <Label htmlFor="password">Hasło</Label>
                    <Input type="password" id="password" name="password" />
                </div>
                <Submit />
            </form>
            <p className="mt-3 text-center text-xs">
                Zmieniłeś zdanie? <br />
                Zarejestruj się przez{" "}
                <span
                    className="underline transition-all hover:cursor-pointer hover:text-first-muted"
                    onClick={() => setIsCredentialsReg(false)}
                >
                    Discord
                </span>{" "}
                lub{" "}
                <span
                    className="underline transition-all hover:cursor-pointer hover:text-first-muted"
                    onClick={handleButtonAuth}
                >
                    zaloguj się.
                </span>
            </p>
        </>
    )
}
function Submit() {
    const { pending } = useFormStatus()
    return (
        <Button
            variant="ghostsecond"
            disabled={pending}
            type="submit"
            className="mt-5 flex w-3/4 max-w-sm items-center justify-center gap-4"
        >
            {pending ? (
                <SpinnerCustom />
            ) : (
                <RiLockPasswordLine className="text-xl" />
            )}
            Rejestracja
        </Button>
    )
}
