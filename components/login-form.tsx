"use client";
import React, { useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RiLockPasswordLine } from "react-icons/ri";
import { login } from "@/lib/user-actions";
import { useFormStatus, useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import SpinnerCustom from "./ui/spinner-custom";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LoginForm({ setAuthModalVisible }: any) {
	const [succes, formAction] = useFormState(login, null);
	const { toast } = useToast();
	const router = useRouter();
	useEffect(() => {
		if (succes) {
			if (succes.success === "ERROR") {
				toast({
					variant: "destructive",
					title: "Wystąpił problem z logowaniem",
					description: "Upewnij się, że dane które wprowadziłeś są poprawne!",
				});
			} else if (succes.success === "SUCCESS") {
				toast({
					variant: "success",
					title: "Pomyślnie zalogowano!",
					description: "Zostałeś przekierowany do ekranu głównego!",
				});
				setAuthModalVisible(false);
				router.refresh();
			}
		}
	}, [succes, formAction]);
	return (
		<>
			<form
				action={formAction}
				className="w-full flex flex-col items-center gap-2"
			>
				<div className="flex flex-col w-full max-w-sm items-start gap-1.5">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						name="email"
						placeholder="jondoe@domain.com"
					/>
				</div>
				<div className="flex flex-col w-full max-w-sm items-start gap-1.5">
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						id="password"
						name="password"
						placeholder="*********"
					/>
				</div>
				<Submit />
			</form>
		</>
	);
}

function Submit() {
	const { pending } = useFormStatus();
	return (
		<Button
			disabled={pending}
			variant="ghostsecond"
			type="submit"
			className="flex items-center mt-5 justify-center gap-4 w-full max-w-md"
		>
			{pending ? <SpinnerCustom /> : <RiLockPasswordLine className="text-xl" />}
			Zaloguj
		</Button>
	);
}
