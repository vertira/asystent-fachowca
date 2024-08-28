import Image from "next/image";
import { Button } from "../button";
import { sendMessage } from "@/lib/server-actions";
import { toast } from "../use-toast";

const NoPermissionModal = ({ link }: { link: string }) => {
	return (
		<div className="space-y-6 flex flex-col justify-center items-center h-full">
			<Image
				src={"/images/subscription.png"}
				width={400}
				height={400}
				alt="Upgrade Membership"
				className="mx-auto"
			/>
			<h1 className="text-2xl font-extrabold text-center">
				Brak dostępu do funkcji
				<span className="text-first-muted"> {link} </span>
			</h1>
			<p className="text-myText-muted text-center max-w-lg">
				Chcesz mieć dostęp do funkcji? Wyślij prośbę do swojego pracodawcy, aby
				odblokować dostęp.
			</p>
			<Button
				variant="ghostsecond"
				onClick={async () => {
					try {
						await sendMessage("Proszę o dostęp");
						toast({
							variant: "success",
							title: "Pomyślnie wysłano prośbę",
						});
					} catch {
						toast({
							variant: "destructive",
							title: "Wystąpił błąd",
						});
					}
				}}
				className="p-2 rounded-md w-full max-w-lg mx-auto "
			>
				Poproś o dostęp
			</Button>
		</div>
	);
};

export default NoPermissionModal;
