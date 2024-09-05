"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Modal from "../ui/modals/modal"
import { useState } from "react"
import PasswordContent from "./password-content"

export default function CardAccountPassword() {
    const [passwordModalVisible, setPasswordModalVisible] = useState(false)
    return (
        <>
            <Modal
                visible={passwordModalVisible}
                setVisible={setPasswordModalVisible}
            >
                <PasswordContent
                    setPasswordModalVisible={setPasswordModalVisible}
                />
            </Modal>
            <Card className="borderColor flex flex-col justify-between bg-cardBackground">
                <CardHeader>
                    <CardTitle className="text-first-muted">Hasło</CardTitle>
                    <CardDescription className="text-myText-muted">
                        Zmień swoje hasło, aby zwiększyć bezpieczeństwo swojego
                        konta.
                    </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="borderColor border-t px-6 py-4">
                    <Button
                        variant="ghostsecond"
                        className="text-myText"
                        onClick={() => setPasswordModalVisible(true)}
                    >
                        Zmień hasło
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
