import Image from "next/image"
import { FaDiscord } from "react-icons/fa"
import { signIn } from "next-auth/react"
import LoginForm from "../login-form"
import { Button } from "../ui/button"
import PasswordForm from "./password-form"

const PasswordContent = ({ setPasswordModalVisible }: any) => {
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
                    Zmień swoje hasło 🛠️🔑
                </div>
                <div className="mx-auto w-full max-w-md pb-10 text-sm text-myText-muted md:text-base">
                    <p className="mx-auto max-w-lg text-balance text-center">
                        <span className="text-nowrap">
                            Uaktualnij swoje hasło i zabezpiecz dostęp do
                            swojego konta.
                        </span>
                        <br />
                        Tutaj każda zmiana to krok w stronę bezpieczeństwa, a
                        każda aktualizacja to pewność, że Twoje dane są
                        chronione.
                    </p>
                </div>
            </div>
            <PasswordForm setPasswordModalVisible={setPasswordModalVisible} />
        </div>
    )
}

export default PasswordContent
