"use client"
import React, { useEffect } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { RiLockPasswordLine } from "react-icons/ri"
import { login } from "@/lib/user-actions"
import { useFormStatus, useFormState } from "react-dom"
import { useToast } from "@/components/ui/use-toast"
import SpinnerCustom from "./ui/spinner-custom"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import { FlaskConical } from "lucide-react"
import { useLoginForm } from "@/context/LoginFormContext"

export default function LoginForm({ setAuthModalVisible }: any) {
    const [succes, formAction] = useFormState(login, null)
    const { toast } = useToast()
    const { isTourActive } = useLoginForm()
    const router = useRouter()
    useEffect(() => {
        if (succes) {
            if (succes.success === "ERROR") {
                toast({
                    variant: "destructive",
                    title: "Wystąpił problem z logowaniem",
                    description:
                        "Upewnij się, że dane które wprowadziłeś są poprawne!",
                })
            } else if (succes.success === "SUCCESS") {
                toast({
                    variant: "success",
                    title: "Pomyślnie zalogowano!",
                    description: "Zostałeś przekierowany do ekranu głównego!",
                })
                setAuthModalVisible(false)
                router.refresh()
            }
        }
    }, [succes, formAction])
    const driverObj = driver({
        disableButtons: ["close"],
        popoverClass: "login-popover",
        onPopoverRender: (popover, { config, state }) => {
            const guestButton = document.createElement("button")
            const staffButton = document.createElement("button")
            guestButton.innerText = "Konto Boss"
            staffButton.innerText = "Konto Staff"
            popover.footerButtons.removeChild(popover.nextButton)
            popover.footerButtons.removeChild(popover.previousButton)
            popover.footerButtons.appendChild(guestButton)
            popover.footerButtons.appendChild(staffButton)
            guestButton.addEventListener("click", () => {
                const formData = new FormData()
                formData.set("email", "boss@boss.app")
                formData.set("password", "Boss1234")
                formAction(formData)
                driverObj.destroy()
            })
            staffButton.addEventListener("click", () => {
                const formData = new FormData()
                formData.set("email", "staff@boss.app")
                formData.set("password", "Staff1234")
                formAction(formData)
                driverObj.destroy()
            })
        },
        steps: [
            {
                element: ".login-tour",
                popover: {
                    title: "Zaloguj się na testowe konto",
                    description: "Wybierz konto do testowania",
                    side: "bottom",
                },
            },
        ],
    })
    const loginTour = (e: any) => {
        e.preventDefault()
        driverObj.drive()
    }
    return (
        <>
            <form
                action={formAction}
                className="flex w-full flex-col items-center gap-2"
            >
                <div
                    className={`flex w-full max-w-sm flex-col items-start gap-1.5 ${isTourActive ? "hidden" : "flex"}`}
                >
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="janedoe@domain.com"
                    />
                </div>
                <div
                    className={`flex w-full max-w-sm flex-col items-start gap-1.5 ${isTourActive ? "hidden" : "flex"}`}
                >
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="*********"
                    />
                </div>
                {isTourActive ? null : (
                    <>
                        {" "}
                        <Submit />
                        <Button
                            onClick={loginTour}
                            variant="ghostsecond"
                            className="login-tour mt-2 flex w-full max-w-md items-center justify-center gap-4"
                        >
                            <FlaskConical />
                            Wypróbuj konto demo
                        </Button>
                    </>
                )}
            </form>
        </>
    )
}

function Submit() {
    const { pending } = useFormStatus()
    return (
        <Button
            disabled={pending}
            variant="ghostsecond"
            type="submit"
            className="mt-5 flex w-full max-w-md items-center justify-center gap-4"
        >
            {pending ? (
                <SpinnerCustom />
            ) : (
                <RiLockPasswordLine className="text-xl" />
            )}
            Zaloguj
        </Button>
    )
}
