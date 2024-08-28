"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { sendMessage } from "@/lib/server-actions";
import { mutate } from "swr";
import { MessageCirclePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Badge } from "../ui/badge";
export function AddMessage({ authenticatedUser }: { authenticatedUser: any }) {
	const [message, setMessage] = useState("");
	const { toast } = useToast();
	const handleSubmit = async () => {
		try {
			await sendMessage(message);
			mutate("getUserMessages");
			setMessage("");
		} catch {
			toast({
				variant: "success",
				title: "Nie udało się wysłać wiadomości!",
			});
		} finally {
			toast({
				variant: "success",
				title: "Wysłano wiadomość!",
			});
		}
	};
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="ghostsecond" className="text-first gap-3">
					<span className="hidden lg:flex">Dodaj</span>
					<MessageCirclePlus />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="bg-cardBackground border borderColor">
				<div className="mx-auto w-full max-w-sm">
					<div className="p-4 pb-0">
						<div className="flex flex-col-reverse items-center justify-center space-x-2 relative">
							<div className="grid w-full gap-1.5">
								<Label htmlFor="message">Twoja wiadomość</Label>
								<Textarea
									placeholder="Wpisz tutaj swoją wiadomość!"
									id="message"
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									name="message"
									className="bg-cardBackground border borderColor text-myText placeholder:text-myText-muted focus-visible:ring-0 "
								/>
							</div>
							<div className="flex self-start py-4 items-center gap-3">
								<div className="relative">
									<Avatar className="ring-1 ring-offset-2 ring-offset-myBackground ring-first-muted self-start">
										<AvatarImage src={authenticatedUser?.user.image} />
										<AvatarFallback>
											<Image
												src="/favicon.ico"
												width={48}
												height={48}
												alt="avatar logo fallback"
											/>
										</AvatarFallback>
									</Avatar>
									<Badge
										className={`
										${
											authenticatedUser.user.role === "EMPLOYER"
												? "bg-green-700"
												: "bg-indigo-700"
										} absolute -top-3 -z-10 left-6
									`}
									>
										{authenticatedUser.user.role === "EMPLOYER"
											? "BOSS"
											: "STAFF"}
									</Badge>
								</div>
								<span className="text-lg font-medium text-first-muted mt-1">
									{authenticatedUser.user.name}
								</span>
							</div>
						</div>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button
									variant="ghostsecond"
									onClick={handleSubmit}
									disabled={!message}
								>
									Wyślij
								</Button>
							</DrawerClose>
							<DrawerClose asChild>
								<Button variant="ghostsecond">Anuluj</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
