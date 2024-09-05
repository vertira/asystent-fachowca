import Image from "next/image"
import { FaDiscord } from "react-icons/fa"
import { signIn } from "next-auth/react"
import LoginForm from "../login-form"
import { Button } from "../ui/button"
import { useLoginForm } from "@/context/LoginFormContext"
import { DemoAccount } from "../demo-account-card"

const AuthContent = ({ handleButtonRegister, setAuthModalVisible }: any) => {
    const { isTourActive } = useLoginForm()
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
                    Witaj w świecie Twoich projektów! 🏠✨
                </div>
                <div className="mx-auto w-full max-w-md pb-10 text-sm text-myText-muted md:text-base">
                    <p className="text-centerw mx-auto max-w-lg text-balance">
                        <span>Otwórz drzwi do swoich budowlanych marzeń.</span>
                        <br />
                        Tutaj każdy remont to nowa przygoda, a każda naprawa to
                        krok w stronę doskonałości.
                    </p>
                </div>
            </div>
            {isTourActive && (
                <div className="mb-6 flex w-full flex-col justify-around gap-4 md:flex-row">
                    <DemoAccount
                        account="Konto Boss"
                        role="boss"
                        contentNum={0}
                    />
                    <DemoAccount
                        account="Konto Staff"
                        role="staff"
                        contentNum={1}
                    />
                </div>
            )}
            <LoginForm setAuthModalVisible={setAuthModalVisible} />
            {!isTourActive && (
                <>
                    <Button
                        variant="ghostsecond"
                        onClick={() => signIn("discord", { redirect: false })}
                        className="mt-4 flex w-full max-w-xs items-center justify-center gap-4"
                    >
                        <FaDiscord className="text-xl" />
                        Logowanie przez Discord
                    </Button>
                    <p className="mt-3 text-center text-xs">
                        Nie masz konta? Przejdź do{" "}
                        <span
                            className="underline transition-all hover:cursor-pointer hover:text-first-muted"
                            onClick={handleButtonRegister}
                        >
                            rejestracji
                        </span>
                    </p>
                </>
            )}
        </div>
    )
}

export default AuthContent
