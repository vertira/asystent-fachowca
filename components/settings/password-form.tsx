"use client";
import React, { useEffect } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { changePassword } from "@/lib/user-actions";
import { useFormStatus, useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SpinnerCustom from "../ui/spinner-custom";

export default function PasswordForm({ setPasswordModalVisible }: any) {
	const [error, formAction] = useFormState(changePassword, null);
	const { toast } = useToast();
	useEffect(() => {
		if (error) {
			if (error.error === "MISSING") {
				toast({
					variant: "destructive",
					title: "Wystąpił problem!",
					description: "Upewnij się, czy wszystkie pola są uzupełnione!",
				});
			} else if (error.error === "OLDNEWPASSWORD") {
				toast({
					variant: "destructive",
					title: "Wystąpił problem!",
					description: "Nie możesz zmienić na to samo hasło !",
				});
			} else if (error.error === "!MATCHEDOLDPASS") {
				toast({
					variant: "destructive",
					title: "Wystąpił problem!",
					description: "Upewnij się, że wpisałeś poprawne stare hasło!",
				});
			} else if (error.error === "!MATCHEDNEWPASS") {
				toast({
					variant: "destructive",
					title: "Wystąpił problem!",
					description: "Upewnij się, że nowe hasła pasują do siebie!",
				});
			} else if (error.error === "SERVER") {
				toast({
					variant: "destructive",
					title: "Wystąpił problem!",
					description: "Spróuj jeszcze raz",
				});
			} else if (error.success === "SUCCESS") {
				toast({
					variant: "success",
					title: "Pomyślnie zmieniono hasło!",
				});
				setPasswordModalVisible(false);
			}
		}
	}, [error, formAction]);
	return (
		<>
			<form
				action={formAction}
				className="w-full flex flex-col items-center gap-2"
			>
				<div className="flex flex-col w-full max-w-sm items-start gap-1.5">
					<Label htmlFor="oldpassword">Stare hasło</Label>
					<Input type="password" id="oldpassword" name="oldpassword" />
				</div>
				<div className="flex flex-col w-full max-w-sm items-start gap-1.5">
					<Label htmlFor="newpassword">Nowe hasło</Label>
					<Input type="password" id="newpassword" name="newpassword" />
				</div>
				<div className="flex flex-col w-full max-w-sm items-start gap-1.5">
					<Label htmlFor="newpasswordconfirm">Potwierdz nowe hasło</Label>
					<Input
						type="password"
						id="newpasswordconfirm"
						name="newpasswordconfirm"
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
			Zmień hasło
		</Button>
	);
}
