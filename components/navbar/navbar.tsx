"use client";

import { useState } from "react";
import Logo from "./logo";
import SignInButton from "./sign-in-button";
import SignUpButton from "./sign-up-button";
import Modal from "../ui/modals/modal";
import AuthContent from "./auth-content";
import RegisterContent from "./register-content";
import { useRegisterForm } from "@/context/RegisterFormContext";
import { Button } from "../ui/button";
import ShimmerButton from "../landing-components/shimmer-button";

interface NavbarProps {
	authenticatedUser?: any;
	notifications?: any;
	products?: any;
	children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({
	children,
}) => {
	const [authModalVisible, setAuthModalVisible] = useState(false);
	const { registerModalVisible, setRegisterModalVisible } = useRegisterForm();

	const handleButtonAuth = () => {
		setAuthModalVisible(true);
		setRegisterModalVisible(false);
	};
	const handleButtonRegister = () => {
		setAuthModalVisible(false);
		setRegisterModalVisible(true);
	};

	return (
		<>
			<div className="border-b borderColor py-2 md:py-5 px-4 md:px-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Logo />
					</div>

					<div className="flex items-center text-sm space-x-10 cursor-pointer">
						<div className="flex items-center space-x-6 cursor-pointer text-sm">
							<Button
								variant="ghostsecond"
								onClick={handleButtonAuth}
								className="hover:scale-105"
							>
								Logowanie
							</Button>
							<ShimmerButton className="flex justify-center mx-auto" borderRadius="0.375rem">
								<span className="z-10 whitespace-pre text-center text-sm font-semibold leading-none tracking-tight text-myText ">
									Rejestracja
								</span>
							</ShimmerButton>
						</div>
					</div>
					<Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
						<AuthContent
							handleButtonRegister={handleButtonRegister}
							setAuthModalVisible={setAuthModalVisible}
						/>
					</Modal>
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
	);
};

export default Navbar;
