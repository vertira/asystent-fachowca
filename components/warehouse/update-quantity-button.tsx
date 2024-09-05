"use client"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { CircleMinus, CirclePlus, Diff, Pen } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { EditWarehosueMaterial } from "./edit-warehouse-material"

export default function UpdateQuantityButton({ material }: { material: any }) {
    const [open, setIsOpen] = useState(false)
    const [activeAction, setActiveAction] = useState("")

    return (
        <>
            <EditWarehosueMaterial
                material={material}
                open={open}
                setIsOpen={setIsOpen}
                activeAction={activeAction}
                setActiveAction={setActiveAction}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghostsecond"
                        className="h-8 w-8 p-0 focus-visible:ring-first-muted focus-visible:ring-offset-0"
                    >
                        <span className="sr-only">Menu</span>
                        <Diff className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="borderColor border bg-cardBackground p-4 text-myText"
                >
                    <DropdownMenuLabel className="text-lg font-extrabold text-first-muted">
                        Opcje
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                        className="flex items-center gap-2 text-base focus:bg-first-muted/30 focus:text-myText"
                        onClick={() => {
                            setIsOpen(true)
                            setActiveAction("increment")
                        }}
                    >
                        <CirclePlus className="h-4 w-4 text-first-muted" />
                        Dodaj ilość
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center gap-2 text-base focus:bg-first-muted/30 focus:text-myText"
                        onClick={() => {
                            setIsOpen(true)
                            setActiveAction("decrement")
                        }}
                    >
                        <CircleMinus className="h-4 w-4 text-first-muted" />
                        Usuń ilość
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center gap-2 text-base focus:bg-first-muted/30 focus:text-myText"
                        onClick={() => {
                            setIsOpen(true)
                            setActiveAction("change")
                        }}
                    >
                        <Pen className="h-4 w-4 text-first-muted" />
                        Zmień ilość
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
