"use client"

import { useState } from "react"
import Logo from "./logo"
import Modal from "../ui/modals/modal"
import AuthContent from "./auth-content"
import RegisterContent from "./register-content"
import { useLoginForm } from "@/context/LoginFormContext"
import { Button } from "../ui/button"
import ShimmerButton from "../landing-components/shimmer-button"
import TourModal from "../ui/modals/tour-modal"

interface NavbarProps {
    authenticatedUser?: any
    notifications?: any
    products?: any
    children: React.ReactNode
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
    const [registerModalVisible, setRegisterModalVisible] = useState(false)
    const { loginModalVisible, setLoginModalVisible } = useLoginForm()

    const handleButtonAuth = () => {
        setLoginModalVisible(true)
        setRegisterModalVisible(false)
    }
    const handleButtonRegister = () => {
        setLoginModalVisible(false)
        setRegisterModalVisible(true)
    }
    return (
        <>
            <div className="borderColor border-b px-4 py-2 md:px-6 md:py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Logo />
                    </div>

                    <div className="flex cursor-pointer items-center space-x-10 text-sm">
                        <div className="flex cursor-pointer items-center space-x-6 text-sm">
                            <Button
                                variant="ghostsecond"
                                onClick={handleButtonAuth}
                                className="hover:scale-105"
                            >
                                Logowanie
                            </Button>
                            <ShimmerButton
                                className="mx-auto flex justify-center"
                                borderRadius="0.375rem"
                            >
                                <span className="z-10 whitespace-pre text-center text-sm font-semibold leading-none tracking-tight text-myText">
                                    Rejestracja
                                </span>
                            </ShimmerButton>
                        </div>
                    </div>

                    <TourModal
                        visible={loginModalVisible}
                        setVisible={setLoginModalVisible}
                    >
                        <AuthContent
                            handleButtonRegister={handleButtonRegister}
                            setAuthModalVisible={setLoginModalVisible}
                        />
                    </TourModal>
                    <Modal
                        visible={registerModalVisible}
                        setVisible={setRegisterModalVisible}
                    >
                        <RegisterContent handleButtonAuth={handleButtonAuth} />
                    </Modal>
                </div>
            </div>
            {children}
        </>
    )
}
