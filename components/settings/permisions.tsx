import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import SpinnerCustom from "../ui/spinner-custom"
import { Badge } from "../ui/badge"
import { SwitchButtonUser } from "./switch-button-user"
import { Card, CardContent } from "../ui/card"

export function Permisions({ employees }: { employees: any }) {
    return (
        <Card className="borderColor flex items-center bg-cardBackground lg:col-span-2">
            <CardContent className="flex h-full w-full flex-col justify-start gap-5 px-6 py-3">
                <div className="self-start text-2xl font-semibold leading-none tracking-tight text-first-muted">
                    Zarządzaj uprawnieniami użytkowników:
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {employees.map((employe: any) => {
                        return (
                            <AccordionItem
                                value={employe.id}
                                key={employe.id}
                                className="borderColor"
                            >
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex">
                                            <Avatar className="z-10 ring-1 ring-first-muted ring-offset-2 ring-offset-myBackground">
                                                <AvatarImage
                                                    src={employe.image}
                                                />
                                                <AvatarFallback>
                                                    <SpinnerCustom />
                                                </AvatarFallback>
                                            </Avatar>
                                            <Badge className="pointer-events-none absolute -top-2 z-0 translate-x-2/3 select-none bg-indigo-700 px-1.5 py-[0.1px]">
                                                STAFF
                                            </Badge>
                                        </div>
                                        <span className="mt-1 text-2xl font-semibold leading-none tracking-tight text-myText">
                                            {employe.name}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="my-3 px-2">
                                    <SwitchButtonUser employe={employe} />
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </CardContent>
        </Card>
    )
}
