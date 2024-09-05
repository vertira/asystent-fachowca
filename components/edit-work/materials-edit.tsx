import React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Calendar } from "lucide-react"
import { MaterialAssign } from "./material-assign"

export default function MaterialsEdit({ work }: { work: any }) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem
                value="item-1"
                className="borderColor max-w-full data-[state|=open]:border-none"
            >
                <AccordionTrigger className="transition-all hover:bg-cardBackground data-[state|=open]:bg-cardBackground">
                    <span className="flex gap-4 px-4 text-2xl font-extrabold text-first-muted">
                        <Calendar className="text-myText" />
                        Materiały
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="min-h-[50vh] w-full">
                        <MaterialAssign work={work} />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
