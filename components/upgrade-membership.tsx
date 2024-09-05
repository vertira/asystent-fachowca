import Image from "next/image";
import { Button } from "./ui/button";
import { sendMessage } from "@/lib/server-actions";
import { toast } from "./ui/use-toast";

const UpgradeMembership = ({
  authenticatedUser,
}: {
  authenticatedUser: any;
}) => {
  const isStaff = authenticatedUser.user.role === "STAFF";
  return (
    <div className="space-y-6 flex flex-col justify-center items-center h-full">
      <Image
        src={"/images/subscription.png"}
        width={400}
        height={400}
        alt="Upgrade Membership"
        className="mx-auto"
      />
      {isStaff ? (
        <>
          <h1 className="text-2xl font-extrabold text-center">
            Poproś pracodawcę o dostęp
            <span className="text-first-muted"> Premium </span>i odblokuj więcej
            funkcji
          </h1>
          <p className="text-myText-muted text-center max-w-lg">
            Chcesz tworzyć więcej projektów? Wyślij prośbę do swojego
            pracodawcy, aby odblokować nieograniczoną liczbę projektów i
            dodatkowe funkcje.
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
        </>
      ) : (
        <>
          <h1 className="text-2xl font-extrabold text-center">
            Przejdź na wersję <span className="text-first-muted">Premium </span>
            i odblokuj więcej funkcji
          </h1>
          <p className="text-myText-muted text-center max-w-lg">
            Chcesz tworzyć więcej projektów? Zaktualizuj swoje członkostwo, aby
            odblokować nieograniczoną liczbę projektów i dodatkowe funkcje.
          </p>
          <Button
            variant="ghostsecond"
            className="p-2 rounded-md w-full max-w-lg mx-auto "
          >
            Zaktualizuj członkostwo
          </Button>
        </>
      )}
    </div>
  );
};

export default UpgradeMembership;
