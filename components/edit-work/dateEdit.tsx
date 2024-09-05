"use client"
import React, { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Pencil } from "lucide-react"
import { CalendarEditWork } from "./calendarEditWork"
import { pl } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { getWorksByUserId, updateWorkField } from "@/lib/server-actions"
import useSWR, { mutate } from "swr"
import { toast } from "../ui/use-toast"
import { formatDateRange, parseDateRange } from "../new-work/steps"
import { useRouter } from "next/navigation"
const fetchUserWorks = async (): Promise<any> => {
    return await getWorksByUserId()
}
export default function DateEdit({ work }: { work: any }) {
    const startDate = new Date(work.startDate)
    const endDate = new Date(work.endDate)
    const [isEdit, setIsEdit] = useState(false)
    const [date, setDate] = useState<DateRange | undefined>({
        from: startDate,
        to: endDate,
    })
    const { data: works } = useSWR("getWorksByUserId", () => fetchUserWorks())
    const router = useRouter()
    const handleSubmit = async () => {
        const { formattedFrom, formattedTo } = formatDateRange(date)
        const parsedDates = parseDateRange({ formattedFrom, formattedTo })
        try {
            await updateWorkField(work.id, "startDate", parsedDates.from)
            await updateWorkField(work.id, "endDate", parsedDates.to)
            setIsEdit(false)
            toast({
                variant: "success",
                title: `Poprawnie zmieniono datę w ${work.name}`,
            })
            mutate("getWorksByUserId")
            router.refresh()
        } catch {
            toast({
                variant: "destructive",
                title: "Wystąpił problem",
            })
        }
    }
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="borderColor max-w-full">
                <AccordionTrigger
                    className="transition-all hover:bg-cardBackground data-[state|=open]:bg-cardBackground"
                    onClick={() => setIsEdit(false)}
                >
                    <span className="flex gap-4 px-4 text-2xl font-extrabold text-first-muted">
                        <CalendarIcon className="text-myText" />
                        Data
                        {isEdit && (
                            <span className="text-sm text-myText">
                                <sup>*edytowanie</sup>
                            </span>
                        )}
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="w-full">
                        <div className="flex flex-col items-start gap-4 py-4">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghostsecond"
                                    className="text-first"
                                    onClick={() => {
                                        setIsEdit((prevState) => !prevState)
                                        setDate({
                                            from: startDate,
                                            to: endDate,
                                        })
                                    }}
                                >
                                    <Pencil className="text-lg" />
                                </Button>
                                <p className="rounded-xl py-2 text-center text-base text-myText underline decoration-first-muted underline-offset-4 md:px-4 md:text-xl">
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(
                                                    date.from,
                                                    "LLL dd, y",
                                                    {
                                                        locale: pl,
                                                    },
                                                ).toString()}{" "}
                                                -{" "}
                                                {format(date.to, "LLL dd, y", {
                                                    locale: pl,
                                                }).toString()}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y", {
                                                locale: pl,
                                            })
                                        )
                                    ) : (
                                        <span>Wybierz datę</span>
                                    )}
                                </p>
                            </div>
                            {isEdit ? (
                                <>
                                    <div className="mb-px mt-10 flex w-full justify-center gap-2 text-xs md:text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                            <span>Data dzisiejsza</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                            <span>Data zajęta</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                                            <span>Data zaznaczona</span>
                                        </div>
                                    </div>
                                    <Calendar
                                        className="mx-auto w-full max-w-lg rounded-md bg-cardBackground/90"
                                        locale={pl}
                                        initialFocus
                                        mode="range"
                                        works={works}
                                        fromDate={new Date()}
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={1}
                                    />
                                </>
                            ) : (
                                <CalendarEditWork
                                    className="mx-auto w-full max-w-lg rounded-md bg-cardBackground/90"
                                    locale={pl}
                                    mode="range"
                                    fromDate={startDate}
                                    defaultMonth={startDate}
                                    selected={date}
                                    numberOfMonths={1}
                                />
                            )}
                            <Button
                                variant="ghostsecond"
                                className={`${!isEdit && "hidden"} my-2 w-1/4 self-center`}
                                disabled={false}
                                onClick={handleSubmit}
                            >
                                Zapisz
                            </Button>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
