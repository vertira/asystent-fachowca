"use client"
import React, { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Pencil, Tag } from "lucide-react"
import { categories } from "../new-work/steps-content"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"
import { updateCategoriesWork, updateWorkField } from "@/lib/server-actions"
import { useRouter } from "next/navigation"

export default function CategiryEdit({ work }: { work: any }) {
    const initialState = work.categories.map((category: any) => category.name)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedCategories, setSelectedCategories] =
        useState<string[]>(initialState)
    const router = useRouter()
    const handleSubmit = async () => {
        try {
            await updateCategoriesWork(work.id, selectedCategories)
            toast({
                variant: "success",
                title: `Pomyślnie zmieniono kategorie w ${work.name}`,
            })
            router.refresh()
            setIsEdit(false)
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
                    className="rounded-tl-xl rounded-tr-xl transition-all hover:bg-cardBackground data-[state|=open]:bg-cardBackground"
                    onClick={() => setIsEdit(false)}
                >
                    <div className="flex gap-4 px-4 text-2xl font-extrabold text-first-muted">
                        <Tag className="text-myText" />
                        Kategoria
                        {isEdit && (
                            <span className="text-sm text-myText">
                                <sup>*edytowanie</sup>
                            </span>
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="mt-4 flex items-center gap-4">
                        <Button
                            variant="ghostsecond"
                            className="text-first"
                            onClick={() => {
                                setIsEdit((prevState) => !prevState)
                            }}
                        >
                            <Pencil className="text-lg" />
                        </Button>
                        {isEdit && (
                            <Button
                                variant="ghostsecond"
                                className="my-2 w-1/4 self-end"
                                disabled={
                                    selectedCategories.length === 0 ||
                                    JSON.stringify(selectedCategories) ===
                                        JSON.stringify(initialState)
                                }
                                onClick={handleSubmit}
                            >
                                Zapisz
                            </Button>
                        )}
                    </div>
                    <div className="grid grid-cols-3 items-center justify-center gap-2 pt-4 md:grid-cols-4">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                className="borderColor flex rounded-full border"
                                onClick={() => {
                                    if (isEdit) {
                                        if (
                                            selectedCategories.includes(
                                                category,
                                            )
                                        ) {
                                            setSelectedCategories((prev) =>
                                                prev.filter(
                                                    (cat) => cat !== category,
                                                ),
                                            )
                                        } else if (
                                            selectedCategories.length < 3
                                        ) {
                                            setSelectedCategories((prev) => [
                                                ...prev,
                                                category,
                                            ])
                                        }
                                    }
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div
                                    className={`text-md w-full cursor-pointer p-2 text-center md:text-sm ${
                                        selectedCategories.includes(category)
                                            ? "rounded-full bg-gradient-to-b from-[#ff7400] to-[#803a00] text-myText"
                                            : "text-myText-muted"
                                    }`}
                                >
                                    {category}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
