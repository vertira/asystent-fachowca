"use client"
import React from "react"
import { Button } from "../ui/button"
import { IoTrashBinOutline } from "react-icons/io5"
import { deleteCode } from "@/lib/server-actions"
import { useRouter } from "next/navigation"

export default function DeleteButton({ item }: { item: any }) {
    const router = useRouter()
    const handleDeleteCode = async (codeId: string) => {
        try {
            await deleteCode(codeId)
            router.refresh()
        } catch {
            console.log("ERROR")
        }
    }
    return (
        <Button
            variant="ghostsecond"
            size="sm"
            onClick={() => handleDeleteCode(item.id)}
        >
            <IoTrashBinOutline className="text-lg text-myText hover:text-first-muted" />
        </Button>
    )
}
