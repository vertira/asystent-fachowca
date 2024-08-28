import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { IoTrashBinOutline } from "react-icons/io5";
import { EditMaterialiTable } from "./edit-material-table";
export function MaterialTable({ materialsTable, deleteMaterial }: any) {
	const data = materialsTable;
	return (
		<Table className="my-10">
			<TableHeader className="w-full">
				<TableRow>
					<TableHead className="text-first">Nazwa materiału</TableHead>
					<TableHead className="text-center text-first border-l borderColor">
						Ilość
					</TableHead>
					<TableHead className="text-center text-first border-l borderColor">
						Źródło
					</TableHead>
					<TableHead className="text-start  text-first border-l borderColor ">
						<span className="ml-6">Edytuj/Usuń</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.length <= 0 ? (
					<TableRow>
						<TableCell className="border-r borderColor">
							Tutaj pojawią się dodane materiały
						</TableCell>
						<TableCell className="text-center border-l borderColor">
							Tutaj pojawi się ilość
						</TableCell>
						<TableCell>
							<Button
								variant="ghostsecond"
								size="sm"
								className="opacity-0 cursor-none"
							>
								<IoTrashBinOutline className="text-lg " />
							</Button>
						</TableCell>
					</TableRow>
				) : (
					<>
						{data.map((item: any) => (
							<TableRow key={item.id}>
								<TableCell className="p-0 px-4">{item.name}</TableCell>
								<TableCell className="text-center border-l borderColor">
									{item.quantity}
									{item.unit}
								</TableCell>
								<TableCell className="text-center border-l borderColor border-r">
									{item.materialId ? "Magazyn" : "Sklep"}
								</TableCell>
								<TableCell className="flex gap-4 px-0">
									<EditMaterialiTable
										id={item.id}
										materialId={item.materialId}
										name={item.name}
										quantity={item.quantity}
										unit={item.unit}
									/>
									<Button
										variant="ghostsecond"
										size="sm"
										onClick={() =>
											deleteMaterial(
												item.id,
												item.materialId,
												item.quantity,
												item.name
											)
										}
									>
										<IoTrashBinOutline className="text-sm md:text-lg " />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</>
				)}
			</TableBody>
		</Table>
	);
}
