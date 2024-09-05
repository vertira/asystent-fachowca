"use client"

import { UploadButton } from "@/lib/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { toast } from "../ui/use-toast"
import { SwitchCamera } from "lucide-react"
import SpinnerCustom from "../ui/spinner-custom"
import { createWorkImg } from "@/lib/server-actions"
import { useRouter } from "next/navigation"

interface LogoUploaderProps {
    endpoint: keyof typeof ourFileRouter
    workId: string
}

export const ImageUploader = ({ endpoint, workId }: LogoUploaderProps) => {
    const router = useRouter()
    return (
        <UploadButton
            config={{
                mode: "auto",
            }}
            endpoint={endpoint}
            appearance={{
                button: `ut-ready:bg-transparent ut-ready:text-first-muted hover:ut-ready:bg-cardBackground/80 ut-ready:ring-0 ut-ready:border ut-ready:borderColor transition-all group ut-uploading:cursor-not-allowed ut-uploading:ring-0 bg-transparent rounded-lg focus:outline-none after:bg-first-muted`,
                container: "",
                allowedContent: "hidden",
            }}
            content={{
                button({ ready }) {
                    if (ready)
                        return (
                            <div className="flex items-center gap-2">
                                <SwitchCamera className="text-myText" />
                                Dodaj zdjęcie
                            </div>
                        )

                    return <SpinnerCustom />
                },
            }}
            onClientUploadComplete={async (res) => {
                try {
                    await createWorkImg(workId, res?.[0].url)
                    toast({
                        variant: "success",
                        title: "Pomyślnie dodano zdjęcie!",
                    })
                    router.refresh()
                } catch {
                    toast({
                        variant: "destructive",
                        title: "Wystąpił błąd!",
                    })
                }
            }}
            onUploadError={(error: Error) => {
                toast({
                    variant: "destructive",
                    title: `${error}`,
                })
            }}
        />
    )
}
