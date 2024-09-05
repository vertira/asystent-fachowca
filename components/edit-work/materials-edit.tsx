import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "lucide-react";
import { MaterialAssign } from "./material-assign";

export default function MaterialsEdit({ work }: { work: any }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="borderColor data-[state|=open]:border-none max-w-full"
      >
        <AccordionTrigger className="hover:bg-cardBackground transition-all data-[state|=open]:bg-cardBackground">
          <span className="text-2xl font-extrabold flex gap-4 text-first-muted px-4 ">
            <Calendar className="text-myText" />
            Materiały
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full min-h-[50vh]">
            <MaterialAssign work={work} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
