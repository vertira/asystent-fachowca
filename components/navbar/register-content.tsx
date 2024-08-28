import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { useState } from "react";
import RegisterForm from "../register-form";
import { Button } from "../ui/button";
const RegisterContent = ({ handleButtonAuth }: any) => {
	const [isCredentialsReg, setIsCredentialsReg] = useState(false);
	return (
		<div className="flex items-center justify-center flex-col">
			<Image
				src={"/logo/small-logo.png"}
				alt="logo"
				width={150}
				height={150}
				className="p-10"
			/>

			<div className="flex flex-col items-center justify-center text-center">
				<div className="text-2xl font-semibold pb-4 text-myText ">
					Rozpocznij swoją budowlaną przygodę! 🏗️🚀
				</div>
				<div className="text-sm md:text-base text-myText-muted w-full max-w-md pb-10 mx-auto">
					<p className="mx-auto text-balance text-center">
						<span className="text-nowrap">
							Witaj w gronie budowniczych przyszłości!
						</span>
						<br /> Rejestrując się, zyskujesz dostęp do świata nieograniczonych
						możliwości remontowych i budowlanych. Stwórz konto i zacznij
						realizować swoje projekty już dziś!
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
						className="flex items-center justify-center gap-4 px-10 w-full max-w-lg"
						onClick={() => setIsCredentialsReg(true)}
					>
						<RiLockPasswordLine className="text-xl" />
						Rejestracja przez Email
					</Button>
					<Button
						variant="ghostsecond"
						onClick={() => signIn("discord", { redirect: false })}
						className="mt-5 flex items-center justify-center gap-4 px-10 w-full max-w-lg"
					>
						<FaDiscord className="text-xl" />
						Rejestracja przez Discord
					</Button>
					<p className="text-xs text-center mt-3">
						Masz już konto? Przejdź do{" "}
						<span
							className="underline hover:cursor-pointer hover:text-first-muted transition-all"
							onClick={handleButtonAuth}
						>
							logowania
						</span>
					</p>
				</>
			)}
		</div>
	);
};

export default RegisterContent;
