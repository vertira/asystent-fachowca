"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import useSWR, { mutate, useSWRConfig } from "swr";
import { toast } from "../ui/use-toast";
import { Pencil } from "lucide-react";
import { updateMaterialWarehouse } from "@/lib/server-actions";

export function EditWarehosueMaterial({
	material,
	open,
	setIsOpen,
	activeAction,
	setActiveAction,
}: {
	material: any;
	open: any;
	setIsOpen: any;
	activeAction: any;
	setActiveAction: any;
}) {
	const [materialName, setMaterialName] = useState(material.name);
	const [materialUnit, setMaterialUnit] = useState(material.unit);
	const [materialQuantity, setMaterialQuantity] = useState<number>(0);
	const { mutate } = useSWRConfig();
	const handleSubmit = async () => {
		try {
			await updateMaterialWarehouse(
				material.id,
				activeAction,
				materialQuantity
			);
			mutate("getMaterialByUserId");
			setIsOpen(false);
			setActiveAction("");
			setMaterialQuantity(0);
		} catch {
			toast({
				variant: "destructive",
				title: "Wystąpił błąd",
			});
		}
	};
	return (
		<Drawer open={open} onOpenChange={setIsOpen}>
			<DrawerContent className="bg-cardBackground border borderColor">
				<DrawerHeader className="w-full flex items-center flex-col">
					<DrawerTitle>
						{activeAction === "increment" && "Dodaj ilość"}
						{activeAction === "decrement" && "Usuń ilość "}
						{activeAction === "change" && "Zmień ilość"}
					</DrawerTitle>
					<DrawerDescription className="text-myText-muted">
						{activeAction === "increment" && "Dodaj ilość do magazynu"}
						{activeAction === "decrement" && "Usuń ilość do magazynu"}
						{activeAction === "change" && "Zmień ilość w magazynie"}
					</DrawerDescription>
				</DrawerHeader>
				<div className="w-full flex flex-col items-center gap-2 ">
					<div className="flex flex-col w-3/4 lg:w-1/5 items-start gap-1.5">
						<Label htmlFor="material">Nazwa materiału</Label>
						<Input
							type="text"
							id="material"
							name="material"
							value={materialName}
							disabled={true}
						/>
					</div>
					<div className="flex flex-row w-3/4 lg:w-1/5 items-center gap-5">
						<div className="flex flex-col">
							<Label htmlFor="amount" className="h-5">
								Ilość
							</Label>
							<Input
								autoComplete="off"
								type="number"
								id="amount"
								name="amount"
								value={materialQuantity}
								min={1}
								onChange={(e) => setMaterialQuantity(Number(e.target.value))}
							/>
						</div>
						<Select name="unit" value={materialUnit} disabled={true}>
							<SelectTrigger className="w-[180px] mt-5 relative">
								<Label htmlFor="amount" className="h-5 absolute -top-5 left-0">
									Jednostka
								</Label>
								<SelectValue placeholder="Jednostka" />
							</SelectTrigger>
							<SelectContent>
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
					<Button
						variant="ghostsecond"
						type="submit"
						onClick={handleSubmit}
						className="border rounded-md py-2 my-4 flex items-center justify-center gap-4 px-10 w-3/4 lg:w-1/5"
					>
						<Pencil className="text-sm" />
						{activeAction === "increment" && "Dodaj"}
						{activeAction === "decrement" && "Usuń"}
						{activeAction === "change" && "Zmień"}
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
