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
import { useState } from "react";
import { AvatarUploader } from "./avatar-upload";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SpinnerSmall from "../ui/spinner-small";
import { updateUserField } from "@/lib/server-actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { toast, useToast } from "../ui/use-toast";
import { Badge } from "../ui/badge";

export default function CardAccountAvatar({
  image,
  role,
}: {
  image: string;
  role: "EMPLOYER" | "STAFF";
}) {
  const [newUrl, setNewUrl] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleAvatarUpload = (url: any) => {
    setNewUrl(url);
  };
  const handleSubmit = async () => {
    try {
      await updateUserField("image", newUrl);
      router.refresh();
      return toast({
        variant: "success",
        title: "Pomyślnie zmieniono avatar! ",
      });
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Wystąpił błąd!",
      });
    }
  };
  return (
    <Card className="bg-cardBackground borderColor flex flex-col justify-between ">
      <CardHeader>
        <CardTitle className="text-first-muted">Avatar</CardTitle>
        <CardDescription className="text-myText-muted">
          Zaktualizuj swój awatar, aby odzwierciedlać swoją osobowość i styl.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center relative">
        <div className="relative z-10">
          <Avatar className="h-24  w-24">
            <AvatarImage
              src={newUrl.length > 0 ? newUrl : image}
              alt="avatar"
              className="rounded-full border-2 relative border-first-muted"
            />
            <AvatarFallback>
              <SpinnerSmall />
            </AvatarFallback>
          </Avatar>
          <AvatarUploader
            endpoint="avatar"
            onChange={handleAvatarUpload}
            newUrl={newUrl}
          />
        </div>
        <Badge
          className={`
										${
                      role === "EMPLOYER" ? "bg-green-700" : "bg-indigo-700"
                    } absolute  top-0 translate-x-full z-0 select-none pointer-events-none
									`}
        >
          {role === "EMPLOYER" ? "BOSS" : "STAFF"}
        </Badge>
      </CardContent>
      <CardFooter className="border-t borderColor px-6 py-4">
        <Button
          disabled={newUrl.length === 0}
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
