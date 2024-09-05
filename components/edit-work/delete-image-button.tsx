"use client"
import React from "react"
import { Button } from "../ui/button"
import { deleteWorkImg } from "@/lib/server-actions"
import { toast } from "../ui/use-toast"
import { IoTrashBinOutline } from "react-icons/io5"
import { useRouter } from "next/navigation"

export default function DeleteImageButton({ imageId }: { imageId: string }) {
    const router = useRouter()
    const handleDeleteImg = async () => {
        try {
            await deleteWorkImg(imageId)
            toast({
                variant: "success",
                title: "Pomyślnie usunięto zdjęcie!",
            })
            router.refresh()
        } catch {
            toast({
                variant: "destructive",
                title: "Wystąpił błąd",
            })
        }
    }
    return (
        <Button
            variant="ghostsecond"
            size="sm"
            className="absolute left-0 top-0 z-20 mx-auto my-auto translate-x-1/2 translate-y-1/4 bg-cardBackground 2xl:translate-x-full"
            onClick={handleDeleteImg}
        >
            <IoTrashBinOutline className="text-xl text-red-500" />
        </Button>
    )
}
