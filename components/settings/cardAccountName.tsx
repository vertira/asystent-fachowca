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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

export default function CardAccountName({ name }: { name: string }) {
  const [newName, setNewName] = useState(name);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await updateUserField("name", newName);
      router.refresh();
      return toast({
        variant: "success",
        title: "Pomyślnie zmieniono imię! ",
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
        <CardTitle className="text-first-muted">Imię</CardTitle>
        <CardDescription className="text-myText-muted">
          Zmień swoje imię wyświetlane w aplikacji oraz innym użytkownikom.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input
            placeholder="Store Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </form>
      </CardContent>
      <CardFooter className="border-t borderColor px-6 py-4 end">
        <Button
          disabled={name === newName}
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
