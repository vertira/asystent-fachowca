"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useFormStatus, useFormState } from "react-dom";
import SpinnerCustom from "../ui/spinner-custom";
import { GoPlus } from "react-icons/go";
import { useToast } from "../ui/use-toast";
import { useSWRConfig } from "swr";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { newMaterial } from "@/lib/server-actions";

export default function MaterialForm({
  setVisible,
  data,
}: {
  setVisible: any;
  data: any;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formKey, setFormKey] = useState(0);
  const [success, formAction] = useFormState(newMaterial, null);
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (success) {
      if (success.success === "MATERIAL") {
        toast({
          variant: "destructive",
          title: "Wystąpił problem z dodaniem materiału",
          description: "Wypełnij wszystkie pola!",
        });
      } else if (success.success === "MATERIALEXIST") {
        toast({
          variant: "destructive",
          title: "Wystąpił problem z dodaniem materiału",
          description: "Materiał już istnieje!",
        });
      } else if (success.success === "PREMIUM") {
        toast({
          variant: "destructive",
          title: "Przejdź na premium, aby dodać więcej materiałów !",
        });
        setVisible(false);
      } else if (success.success === "SUCCES") {
        toast({
          variant: "success",
          title: "Pomyślnie dodano!",
          description: "Materiał został pomyślnie dodany.",
        });
        mutate("getMaterialByUserId");
        if (formRef.current) {
          formRef.current.reset();
        }
        setFormKey((prevKey) => prevKey + 1);
        if (data.length >= 5) {
          setVisible(false);
        }
      }
    }
  }, [success, formAction, toast, mutate]);

  return (
    <form
      key={formKey}
      ref={formRef}
      action={formAction}
      className="w-full flex flex-col items-center gap-2"
    >
      <div className="flex flex-col w-3/4 lg:w-2/5 items-start gap-1.5">
        <Label htmlFor="material">Nazwa materiału</Label>
        <Input type="text" id="material" name="material" autoComplete="off" />
      </div>
      <div className="flex flex-row w-3/4 lg:w-2/5 items-center gap-1.5">
        <div className="flex flex-col">
          <Label htmlFor="amount" className="h-5">
            Ilość
          </Label>
          <Input autoComplete="off" type="number" id="amount" name="amount" />
        </div>
        <Select name="unit">
          <SelectTrigger className="w-[180px] mt-5">
            <SelectValue placeholder="Jednostka" />
          </SelectTrigger>
          <SelectContent onCloseAutoFocus={(event) => event.preventDefault()}>
            <SelectGroup>
              <SelectItem value="m" className="text-base">
                m
              </SelectItem>
              <SelectItem value="m2" className="text-base">
                m<sup>2</sup>
              </SelectItem>
              <SelectItem value="m3" className="text-base">
                m<sup>3</sup>
              </SelectItem>
              <SelectItem value="ml" className="text-base">
                ml
              </SelectItem>
              <SelectItem value="l" className="text-base">
                l
              </SelectItem>
              <SelectItem value="g" className="text-base">
                g
              </SelectItem>
              <SelectItem value="kg" className="text-base">
                kg
              </SelectItem>
              <SelectItem value="szt" className="text-base">
                szt
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="ghostsecond"
      disabled={pending}
      type="submit"
      className="border rounded-md py-2 mt-8 flex items-center justify-center gap-4 px-10 w-3/4 lg:w-2/5"
    >
      {pending ? <SpinnerCustom /> : <GoPlus className="text-xl" />}
      Dodaj
    </Button>
  );
}
