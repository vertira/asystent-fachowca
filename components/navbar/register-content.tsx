import Image from "next/image"
import { FaDiscord } from "react-icons/fa"
import { RiLockPasswordLine } from "react-icons/ri"
import { signIn } from "next-auth/react"
import { useState } from "react"
import RegisterForm from "../register-form"
import { Button } from "../ui/button"
const RegisterContent = ({ handleButtonAuth }: any) => {
    const [isCredentialsReg, setIsCredentialsReg] = useState(false)
    return (
        <div className="flex flex-col items-center justify-center">
            <Image
                src={"/logo/small-logo.png"}
                alt="logo"
                width={150}
                height={150}
                className="p-10"
            />

            <div className="flex flex-col items-center justify-center text-center">
                <div className="pb-4 text-2xl font-semibold text-myText">
                    Rozpocznij swoją budowlaną przygodę! 🏗️🚀
                </div>
                <div className="mx-auto w-full max-w-md pb-10 text-sm text-myText-muted md:text-base">
                    <p className="mx-auto text-balance text-center">
                        <span className="text-nowrap">
                            Witaj w gronie budowniczych przyszłości!
                        </span>
                        <br /> Rejestrując się, zyskujesz dostęp do świata
                        nieograniczonych możliwości remontowych i budowlanych.
                        Stwórz konto i zacznij realizować swoje projekty już
                        dziś!
                    </p>
                </div>
            </div>
            {isCredentialsReg ? (
                <RegisterForm
                    handleButtonAuth={handleButtonAuth}
                    setIsCredentialsReg={setIsCredentialsReg}
                />
            ) : (
                <>
                    <Button
                        variant="ghostsecond"
                        className="flex w-full max-w-lg items-center justify-center gap-4 px-10"
                        onClick={() => setIsCredentialsReg(true)}
                    >
                        <RiLockPasswordLine className="text-xl" />
                        Rejestracja przez Email
                    </Button>
                    <Button
                        variant="ghostsecond"
                        onClick={() => signIn("discord", { redirect: false })}
                        className="mt-5 flex w-full max-w-lg items-center justify-center gap-4 px-10"
                    >
                        <FaDiscord className="text-xl" />
                        Rejestracja przez Discord
                    </Button>
                    <p className="mt-3 text-center text-xs">
                        Masz już konto? Przejdź do{" "}
                        <span
                            className="underline transition-all hover:cursor-pointer hover:text-first-muted"
                            onClick={handleButtonAuth}
                        >
                            logowania
                        </span>
                    </p>
                </>
            )}
        </div>
    )
}

export default RegisterContent
