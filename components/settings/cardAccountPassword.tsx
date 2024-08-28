"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Modal from "../ui/modals/modal";
import { useState } from "react";
import PasswordContent from "./password-content";

export default function CardAccountPassword() {
	const [passwordModalVisible, setPasswordModalVisible] = useState(false);
	return (
		<>
			<Modal
				visible={passwordModalVisible}
				setVisible={setPasswordModalVisible}
			>
				<PasswordContent setPasswordModalVisible={setPasswordModalVisible} />
			</Modal>
			<Card className="bg-cardBackground borderColor flex flex-col justify-between ">
				<CardHeader>
					<CardTitle className="text-first-muted">Hasło</CardTitle>
					<CardDescription className="text-myText-muted">
						Zmień swoje hasło, aby zwiększyć bezpieczeństwo swojego konta.
					</CardDescription>
				</CardHeader>
				<CardContent></CardContent>
				<CardFooter className="border-t borderColor px-6 py-4">
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
	);
}
