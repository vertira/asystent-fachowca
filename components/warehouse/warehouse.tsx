"use client"
import * as React from "react"
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { GoPlus } from "react-icons/go"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { getMaterialByUserId, isUserPremium } from "@/lib/server-actions"
import Spinner from "@/components/ui/spinner"
import { DeleteSelected } from "@/components/warehouse/delete-selected"
import { Materials } from "@/types/material"
import NewMaterialModal from "@/components/ui/modals/new-material-modal"
import Modal from "@/components/ui/modals/modal"
import UpgradeMembership from "@/components/upgrade-membership"
import NewMaterial from "@/components/warehouse/new-product-content"
import { columns } from "./columns"

const fetcher = async (): Promise<Materials[]> => {
    return await getMaterialByUserId()
}
export default function Warehouse({
    authenticatedUser,
}: {
    authenticatedUser: any
}) {
    const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false)
    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: "name",
            desc: false,
        },
    ])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [productModalVisible, setProductModalVisible] = useState(false)
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { data, error } = useSWR<Materials[]>("getMaterialByUserId", fetcher)
    const materials: Materials[] = data || []
    const table = useReactTable({
        data: materials,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: { pageSize: 5 },
        },
    })
    if (error) return <div>Coś poszło nie tak....!</div>
    if (!data) return <Spinner />
    const handleClick = async () => {
        const isPremium = await isUserPremium()
        if (!isPremium && data.length >= 5) {
            setIsUpgradeModalVisible(true)
        } else {
            setProductModalVisible(true)
        }
    }
    return (
        <div className="flex flex-1 flex-col bg-myBackground px-6">
            <div className="mb-6 flex justify-start px-0 pt-6 md:mx-auto md:w-3/4 md:px-0">
                <h1 className="text-4xl font-extrabold">Magazyn</h1>
            </div>
            <div className="relative z-10 mx-auto mb-6 flex w-full flex-1 flex-col rounded-lg bg-cardBackground/0 px-4 md:w-3/4 md:px-4 md:pt-6">
                <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-cardBackground/90"></div>
                <div className="glassPattern3 absolute left-0 top-0 h-full w-full rotate-180 rounded-lg"></div>
                <NewMaterialModal
                    visible={productModalVisible}
                    setVisible={setProductModalVisible}
                >
                    <NewMaterial
                        setVisible={setProductModalVisible}
                        data={data}
                    />
                </NewMaterialModal>
                <Modal
                    visible={isUpgradeModalVisible}
                    setVisible={setIsUpgradeModalVisible}
                >
                    <UpgradeMembership authenticatedUser={authenticatedUser} />
                </Modal>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Szukaj..."
                        value={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("name")
                                ?.setFilterValue(event.target.value)
                        }
                        className="mr-5 min-w-20 max-w-md"
                    />
                    <Button
                        variant="ghostsecond"
                        size="sm"
                        onClick={handleClick}
                        className="mr-5"
                    >
                        <GoPlus className="text-lg" />
                        Dodaj materiał
                    </Button>
                    <DeleteSelected table={table} />
                </div>
                <div className="borderColor rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        Brak materiałów.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-myText-muted">
                        {table.getFilteredSelectedRowModel().rows.length} z{" "}
                        {table.getFilteredRowModel().rows.length} wierszy
                        zaznaczone.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="ghostsecond"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Do tyłu
                        </Button>
                        <Button
                            variant="ghostsecond"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Dalej
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
