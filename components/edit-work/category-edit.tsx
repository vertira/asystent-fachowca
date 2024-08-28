"use client";
import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Tag } from "lucide-react";
import { categories } from "../new-work/steps-content";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { updateCategoriesWork, updateWorkField } from "@/lib/server-actions";
import { useRouter } from "next/navigation";

export default function CategiryEdit({ work }: { work: any }) {
	const initialState = work.categories.map((category: any) => category.name);
	const [isEdit, setIsEdit] = useState(false);
	const [selectedCategories, setSelectedCategories] =
		useState<string[]>(initialState);
	const router = useRouter();
	const handleSubmit = async () => {
		try {
			await updateCategoriesWork(work.id, selectedCategories);
			toast({
				variant: "success",
				title: `Pomyślnie zmieniono kategorie w ${work.name}`,
			});
			router.refresh();
			setIsEdit(false);
		} catch {
			toast({
				variant: "destructive",
				title: "Wystąpił błąd",
			});
		}
	};
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1" className="borderColor">
				<AccordionTrigger
					className="hover:bg-cardBackground rounded-tr-xl rounded-tl-xl transition-all data-[state|=open]:bg-cardBackground"
					onClick={() => setIsEdit(false)}
				>
					<div className="text-2xl font-extrabold flex gap-4 text-first-muted px-4 ">
						<Tag className="text-myText" />
						Kategoria
						{isEdit && (
							<span className="text-myText text-sm">
								<sup>*edytowanie</sup>
							</span>
						)}
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className="flex items-center gap-4 mt-4">
						<Button
							variant="ghostsecond"
							className="text-first"
							onClick={() => {
								setIsEdit((prevState) => !prevState);
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
					<div className="grid grid-cols-3 md:grid-cols-4 gap-2 pt-4 items-center justify-center">
						{categories.map((category, index) => (
							<motion.div
								key={index}
								className="flex border borderColor rounded-full "
								onClick={() => {
									if (isEdit) {
										if (selectedCategories.includes(category)) {
											setSelectedCategories((prev) =>
												prev.filter((cat) => cat !== category)
											);
										} else if (selectedCategories.length < 3) {
											setSelectedCategories((prev) => [...prev, category]);
										}
									}
								}}
								whileTap={{ scale: 0.9 }}
							>
								<div
									className={`text-md md:text-sm p-2 cursor-pointer w-full text-center
                                    ${
																			selectedCategories.includes(category)
																				? "bg-gradient-to-b from-[#ff7400] to-[#803a00]  text-myText rounded-full"
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
	);
}
