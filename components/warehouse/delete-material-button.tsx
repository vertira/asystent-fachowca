"use client"
import React from "react"
import { Button } from "../ui/button"
import { IoTrashBinOutline } from "react-icons/io5"
import { useSWRConfig } from "swr"
import { deleteMaterial } from "@/lib/server-actions"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DeleteMaterialButton({ material }: { material: any }) {
    const { mutate } = useSWRConfig()
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div
                        className="borderColor inline-flex h-8 w-8 items-center justify-center whitespace-nowrap rounded-md border p-0 text-base font-medium ring-offset-background transition-all hover:bg-accent/10 hover:text-first-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-first-muted focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        onClick={async () => {
                            await deleteMaterial(material.id)
                            mutate("getMaterialByUserId")
                        }}
                    >
                        <IoTrashBinOutline className="text-xl text-red-500" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Usuń</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
