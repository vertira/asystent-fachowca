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
import { editWorkMaterial, getMaterialById } from "@/lib/server-actions";
import useSWR, { mutate } from "swr";
import { toast } from "../ui/use-toast";
import { Pencil } from "lucide-react";
const fetchWarehouseQuantity = async (materialId: string) => {
	return await getMaterialById(materialId);
};
export function EditMaterialiTable({
	id,
	materialId,
	name,
	unit,
	quantity,
}: {
	id: string;
	materialId: string;
	name: string;
	unit: string;
	quantity: number;
}) {
	const [open, setIsOpen] = useState(false);
	const [materialName, setMaterialName] = useState(name);
	const [materialUnit, setMaterialUnit] = useState(unit);
	const [warehouseQuantity, setWarehouseQuantity] = useState<number>(0);
	const [materialQuantity, setMaterialQuantity] =
		React.useState<number>(quantity);
	const { data } = useSWR("getMaterialById", () =>
		fetchWarehouseQuantity(materialId)
	);
	const handleEditMaterial = async () => {
		try {
			const res = await editWorkMaterial(
				id,
				materialId,
				materialQuantity,
				materialName,
				materialUnit
			);
			if (res?.status === "MISSING") {
				toast({
					variant: "destructive",
					title: "Uzupełnij wszystkie pola!",
				});
			} else if (res?.status === "SAME") {
				toast({
					variant: "destructive",
					title: "Wartość jest taka sama jak poprzednio!",
				});
			} else if (res?.status === "MAXVALUE") {
				toast({
					variant: "destructive",
					title: "Brak takiej ilości w magazynie! ",
				});
			} else if (res?.status === "SUCCESS") {
				toast({
					variant: "success",
					title: `Pomyślnie edytowano ${materialName}`,
				});
				setIsOpen(false);
				mutate("getWorkMaterials");
				mutate("getShoppingList");
				mutate("getMaterialById");
			}
		} catch {
			console.log("ERROR");
		}
	};
	React.useEffect(() => {
		if (data) {
			setWarehouseQuantity(data.quantity);
		}
	}, [data]);

	return (
		<Drawer open={open} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<Button
					variant="ghostsecond"
					size="sm"
					className="text-first gap-3 w-10 ml-10"
				>
					<Pencil className="text-xs" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="bg-cardBackground border borderColor">
				<DrawerHeader className="w-full flex items-center flex-col">
					<DrawerTitle>Edytuj materiał</DrawerTitle>
					<DrawerDescription className="text-myText-muted">
						Tutaj możesz edytować materiał! Jeśli pochodzi z magazynu to tylko
						ilość !<br />
						{materialId && (
							<div className="text-myText-muted underline decoration-first-muted underline-offset-2">
								Dostępna ilość w magazynie{" "}
								<span className="text-first-muted">{warehouseQuantity}</span>
							</div>
						)}
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
							disabled={materialId ? true : false}
							onChange={(e) => setMaterialName(e.target.value)}
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
						<Select
							name="unit"
							value={materialUnit}
							onValueChange={setMaterialUnit}
							disabled={materialId ? true : false}
						>
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
						onClick={handleEditMaterial}
						variant="ghostsecond"
						type="submit"
						className="border rounded-md py-2 my-4 flex items-center justify-center gap-4 px-10 w-3/4 lg:w-1/5"
					>
						<Pencil className="text-sm" />
						Edytuj
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
