import React from "react"
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
import DeleteButton from "./delete-Button"
export default function LastCodes({
    registrationCodes,
}: {
    registrationCodes: any
}) {
    const data = registrationCodes
    return (
        <Table className="my-10">
            <TableHeader className="w-full">
                <TableRow>
                    <TableHead className="text-first">Kod</TableHead>
                    <TableHead className="borderColor border-l text-center text-first">
                        Użyty/Wygasły ?
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell className="borderColor border-r p-0 pl-4 text-myText">
                            Tutaj pojawi się kod
                        </TableCell>
                        <TableCell className="borderColor border-l text-center text-myText">
                            Tutaj pojawi się czy kod jest wykorzystany
                        </TableCell>
                        <TableCell className="p-0">
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
                            <TableRow key={item.code}>
                                <TableCell className="p-0 pl-4 text-myText">
                                    {item.code}
                                </TableCell>
                                <TableCell className="borderColor border-l p-0 pl-4 text-center text-myText">
                                    {item.used
                                        ? "Użyty"
                                        : new Date() > item.expiresAt
                                          ? "Wygasły"
                                          : "Aktywny"}
                                </TableCell>
                                <TableCell className="p-2">
                                    <DeleteButton item={item} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </>
                )}
            </TableBody>
        </Table>
    )
}
