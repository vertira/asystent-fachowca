import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Materials } from "@/types/material";
import DeleteMaterialButton from "./delete-material-button";
import UpdateQuantityButton from "./update-quantity-button";
export const columns: ColumnDef<Materials>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Wybierz wszystkie"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Wybierz wiersz"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "name",
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghostsecond"
					size="datatable"
					className="border-none"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Materiał
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="capitalize text-left">{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "quantity",
		header: () => <div className="text-center">Ilość</div>,
		cell: ({ row }) => {
			const quantity = parseFloat(row.getValue("quantity"));
			const displayQuantity =
				quantity === 0 ? (
					<span className="text-red-500">{quantity}</span>
				) : (
					quantity
				);
			return <div className="text-center font-medium">{displayQuantity}</div>;
		},
	},
	{
		id: "unit",
		accessorKey: "unit",
		header: "Jednostka",
		cell: ({ row }) => {
			const unit = row.getValue("unit") as string;

			const displayUnit =
				unit === "m2" ? (
					<>
						m<sup>2</sup>
					</>
				) : unit === "m3" ? (
					<>
						m<sup>3</sup>
					</>
				) : (
					unit
				);
			return <div className="">{displayUnit}</div>;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const material = row.original;
			return (
				<div className="flex items-center gap-2">
					<UpdateQuantityButton material={material} />
					<DeleteMaterialButton material={material} />
				</div>
			);
		},
	},
];
