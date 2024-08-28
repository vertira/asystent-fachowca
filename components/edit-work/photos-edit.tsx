"use client";
import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Image as ImageIcon, Pencil } from "lucide-react";
import CarouselComponent from "./carousel-component";
import { Button } from "../ui/button";
import { ImageUploader } from "./image-upload";

export default function PhotosEdit({ work }: { work: any }) {
	const [isEdit, setIsEdit] = useState(false);
	return (
		<Accordion type="single" collapsible>
			<AccordionItem
				value="item-1"
				className="borderColor data-[state|=open]:border-none max-w-full"
			>
				<AccordionTrigger
					className="hover:bg-cardBackground transition-all data-[state|=open]:bg-cardBackground"
					onClick={() => setIsEdit(false)}
				>
					<span className="text-2xl font-extrabold flex gap-4 text-first-muted px-4 ">
						<ImageIcon className="text-myText" />
						Zdjęcia
						{isEdit && (
							<span className="text-myText text-sm">
								<sup>*edytowanie</sup>
							</span>
						)}
					</span>
				</AccordionTrigger>
				<AccordionContent>
					<div className="flex items-center gap-4 mt-4">
						<Button
							variant="ghostsecond"
							className="text-first"
							disabled={work.images.length === 0}
							onClick={() => {
								setIsEdit((prevState) => !prevState);
							}}
						>
							<Pencil className="text-lg" />
						</Button>
						{isEdit && <ImageUploader endpoint="workImage" workId={work.id} />}
					</div>
					<div className="w-full">
						<CarouselComponent
							work={work}
							isEdit={isEdit}
							setIsEdit={setIsEdit}
						/>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
