import Image from "next/image"
import { Button } from "./ui/button"
import { sendMessage } from "@/lib/server-actions"
import { toast } from "./ui/use-toast"

const UpgradeMembership = ({
    authenticatedUser,
}: {
    authenticatedUser: any
}) => {
    const isStaff = authenticatedUser.user.role === "STAFF"
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-6">
            <Image
                src={"/images/subscription.png"}
                width={400}
                height={400}
                alt="Upgrade Membership"
                className="mx-auto"
            />
            {isStaff ? (
                <>
                    <h1 className="text-center text-2xl font-extrabold">
                        Poproś pracodawcę o dostęp
                        <span className="text-first-muted"> Premium </span>i
                        odblokuj więcej funkcji
                    </h1>
                    <p className="max-w-lg text-center text-myText-muted">
                        Chcesz tworzyć więcej projektów? Wyślij prośbę do
                        swojego pracodawcy, aby odblokować nieograniczoną liczbę
                        projektów i dodatkowe funkcje.
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
                </>
            ) : (
                <>
                    <h1 className="text-center text-2xl font-extrabold">
                        Przejdź na wersję{" "}
                        <span className="text-first-muted">Premium </span>i
                        odblokuj więcej funkcji
                    </h1>
                    <p className="max-w-lg text-center text-myText-muted">
                        Chcesz tworzyć więcej projektów? Zaktualizuj swoje
                        członkostwo, aby odblokować nieograniczoną liczbę
                        projektów i dodatkowe funkcje.
                    </p>
                    <Button
                        variant="ghostsecond"
                        className="mx-auto w-full max-w-lg rounded-md p-2"
                    >
                        Zaktualizuj członkostwo
                    </Button>
                </>
            )}
        </div>
    )
}

export default UpgradeMembership
