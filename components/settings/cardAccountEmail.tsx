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
import { Input } from "@/components/ui/input";
import { updateUserField } from "@/lib/server-actions";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function CardAccountEmail({ email }: { email: string }) {
  const [newEmail, setNewEmail] = useState(email);
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      await updateUserField("email", newEmail);
      router.refresh();
      return toast({
        variant: "success",
        title: "Pomyślnie zmieniono email! ",
      });
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Wystąpił błąd!",
      });
    }
  };
  return (
    <Card className="bg-cardBackground borderColor flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-first-muted">Email</CardTitle>
        <CardDescription className="text-myText-muted">
          Zaktualizuj swój adres email, aby mieć pewność, że wszystkie
          powiadomienia trafiają we właściwe miejsce.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input
            placeholder="Email..."
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </form>
      </CardContent>
      <CardFooter className="border-t borderColor px-6 py-4">
        <Button
          disabled={email === newEmail}
          variant="ghostsecond"
          className="text-myText"
          onClick={handleSubmit}
        >
          Zapisz
        </Button>
      </CardFooter>
    </Card>
  );
}
