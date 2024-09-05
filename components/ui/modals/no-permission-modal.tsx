import Image from "next/image"
import { Button } from "../button"
import { sendMessage } from "@/lib/server-actions"
import { toast } from "../use-toast"

const NoPermissionModal = ({ link }: { link: string }) => {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-6">
            <Image
                src={"/images/subscription.png"}
                width={400}
                height={400}
                alt="Upgrade Membership"
                className="mx-auto"
            />
            <h1 className="text-center text-2xl font-extrabold">
                Brak dostępu do funkcji
                <span className="text-first-muted"> {link} </span>
            </h1>
            <p className="max-w-lg text-center text-myText-muted">
                Chcesz mieć dostęp do funkcji? Wyślij prośbę do swojego
                pracodawcy, aby odblokować dostęp.
            </p>
            <Button
                variant="ghostsecond"
                onClick={async () => {
                    try {
                        await sendMessage("Proszę o dostęp")
                        toast({
                            variant: "success",
                            title: "Pomyślnie wysłano prośbę",
                        })
                    } catch {
                        toast({
                            variant: "destructive",
                            title: "Wystąpił błąd",
                        })
                    }
                }}
                className="mx-auto w-full max-w-lg rounded-md p-2"
            >
                Poproś o dostęp
            </Button>
        </div>
    )
}

export default NoPermissionModal
