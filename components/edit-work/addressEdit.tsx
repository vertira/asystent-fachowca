"use client"
import React, { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { MapPin, Pencil } from "lucide-react"
import { Button } from "../ui/button"
import AutocompleteAdd from "../new-work/autocomplete-address"
import { toast } from "../ui/use-toast"
import { updateWorkField } from "@/lib/server-actions"
import { useRouter } from "next/navigation"

export default function AddresEdit({ work }: { work: any }) {
    const [isEdit, setIsEdit] = useState(false)
    const [address, setAddress] = useState(work.address)
    const [uploadedMap, setUploadedMap] = useState(work.mapWork)
    const router = useRouter()
    const handleSubmit = async () => {
        try {
            await updateWorkField(work.id, "address", address)
            await updateWorkField(work.id, "mapWork", uploadedMap)
            toast({
                variant: "success",
                title: `Pomyśłnie edytowano ${work.name}`,
            })
            setIsEdit(false)
            router.refresh()
        } catch {
            toast({
                variant: "destructive",
                title: "Wystąpił błąd",
            })
        }
    }
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="borderColor">
                <AccordionTrigger
                    className="transition-all hover:bg-cardBackground data-[state|=open]:bg-cardBackground"
                    onClick={() => setIsEdit(false)}
                >
                    <span className="flex gap-4 px-4 text-2xl font-extrabold text-first-muted">
                        <MapPin className="text-myText" />
                        Adres
                        {isEdit && (
                            <span className="text-sm text-myText">
                                <sup>*edytowanie</sup>
                            </span>
                        )}
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="w-full">
                        <div className="flex flex-col items-start gap-4 py-4">
                            <div className="flex w-full items-start gap-2 xl:w-1/2">
                                <Button
                                    variant="ghostsecond"
                                    className="text-first"
                                    onClick={() => {
                                        setIsEdit((prevState) => !prevState)
                                    }}
                                >
                                    <Pencil className="text-lg" />
                                </Button>
                                <div
                                    className={`${
                                        isEdit && "px-0 py-0 no-underline"
                                    } flex w-full flex-col rounded-xl px-4 py-2 text-base text-myText underline decoration-first-muted underline-offset-4 md:text-xl`}
                                >
                                    {isEdit ? (
                                        <>
                                            <AutocompleteAdd
                                                setUploadedMap={setUploadedMap}
                                                setAddress={(value: string) =>
                                                    setAddress(value)
                                                }
                                            />
                                            <Button
                                                variant="ghostsecond"
                                                className="my-2 w-1/4 self-end"
                                                disabled={
                                                    uploadedMap === work.mapWork
                                                }
                                                onClick={handleSubmit}
                                            >
                                                Zapisz
                                            </Button>
                                        </>
                                    ) : (
                                        work.address
                                    )}
                                </div>
                            </div>
                            <Image
                                src={work.mapWork}
                                alt="Map"
                                width={600}
                                height={400}
                                className={`${
                                    isEdit && "hidden"
                                } mx-auto rounded-lg border border-first-muted`}
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
