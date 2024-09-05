import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { IoTrashBinOutline } from "react-icons/io5"
import { EditMaterialiTable } from "./edit-material-table"
export function MaterialTable({ materialsTable, deleteMaterial }: any) {
    const data = materialsTable
    return (
        <Table className="my-10">
            <TableHeader className="w-full">
                <TableRow>
                    <TableHead className="text-first">
                        Nazwa materiału
                    </TableHead>
                    <TableHead className="borderColor border-l text-center text-first">
                        Ilość
                    </TableHead>
                    <TableHead className="borderColor border-l text-center text-first">
                        Źródło
                    </TableHead>
                    <TableHead className="borderColor border-l text-start text-first">
                        <span className="ml-6">Edytuj/Usuń</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length <= 0 ? (
                    <TableRow>
                        <TableCell className="borderColor border-r">
                            Tutaj pojawią się dodane materiały
                        </TableCell>
                        <TableCell className="borderColor border-l text-center">
                            Tutaj pojawi się ilość
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="ghostsecond"
                                size="sm"
                                className="cursor-none opacity-0"
                            >
                                <IoTrashBinOutline className="text-lg" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ) : (
                    <>
                        {data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell className="p-0 px-4">
                                    {item.name}
                                </TableCell>
                                <TableCell className="borderColor border-l text-center">
                                    {item.quantity}
                                    {item.unit}
                                </TableCell>
                                <TableCell className="borderColor border-l border-r text-center">
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
                                                item.name,
                                            )
                                        }
                                    >
                                        <IoTrashBinOutline className="text-sm md:text-lg" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                )}
            </TableBody>
        </Table>
    )
}
