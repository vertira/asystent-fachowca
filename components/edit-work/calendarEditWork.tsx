"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type CalendarProps = React.ComponentProps<typeof DayPicker>

function CalendarEditWork({
    className,
    classNames,
    showOutsideDays = false,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-first",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "ghostsecond" }),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-first rounded-md w-9 font-normal text-[0.8rem] w-full",
                row: "flex w-full justify-around  text-myText mt-2",
                cell: "h-9 flex-1 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-none [&:has([aria-selected])]:bg-first/30 first:[&:has([aria-selected])]:rounded-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-first-muted",
                ),
                day_range_end: "day-range-end",
                day_selected:
                    " !bg-first-muted text-myText !rounded-md hover:bg-first-muted hover:text-myText focus:rounded-md focus:bg-first-muted focus:text-myText",
                day_today: "!bg-green-500 !rounded-md text-accent-foreground",
                day_outside:
                    "day-outside text-myText-muted opacity-50 aria-selected:bg-accent/50 aria-selected:text-myText-muted aria-selected:opacity-30",
                day_disabled: "text-myText-muted opacity-50 !bg-cardBackground",
                day_range_middle:
                    "aria-selected:!bg-first/30 aria-selected:!rounded-none aria-selected:text-myText",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => (
                    <ChevronRight className="h-4 w-4" />
                ),
            }}
            {...props}
        />
    )
}
CalendarEditWork.displayName = "Calendar"

export { CalendarEditWork }
