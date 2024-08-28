"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayMouseEventHandler, DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "./use-toast";

type CalendarProps = React.ComponentProps<typeof DayPicker>;
function CalendarDashboardUI({
	className,
	classNames,
	showOutsideDays = true,
	works,
	isLoading,
	...props
}: CalendarProps) {
	const [bookedDays, setBookedDays] = React.useState([]);
	const { toast } = useToast();
	React.useEffect(() => {
		const formattedDates = works.map((item: any) => {
			const from = new Date(item.startDate);
			const to = new Date(item.endDate);
			return { from, to };
		});
		setBookedDays(formattedDates);
	}, [works]);
	const handleDayClick: DayMouseEventHandler = (day, { booked }) => {
		{
			booked
				? toast({
						variant: "destructive",
						title: `Dzień ${day.toLocaleDateString()} jest zajęty.`,
				  })
				: toast({
						variant: "success",
						title: `Dzień ${day.toLocaleDateString()} jest wolny.`,
				  });
		}
	};
	return (
		<DayPicker
			modifiers={{ booked: bookedDays }}
			modifiersClassNames={{ booked: "bg-red-400" }}
			onDayClick={handleDayClick}
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months:
					"flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ",
				month: "space-y-4 w-full",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell: "text-myText rounded-md font-normal text-[0.8rem] w-full",
				row: "flex w-full justify-around mt-2",
				cell: "h-9 w-9 text-center  text-sm p-0 relative rounded-md [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
				day: cn(
					buttonVariants({ variant: "ghost" }),
					isLoading
						? "h-9 w-9 p-0 font-normal animate-pulse rounded-md !bg-muted aria-selected:opacity-100"
						: "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
				),
				day_range_end: "day-range-end",
				day_selected:
					"bg-cardBackground text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-accent focus:text-black",
				day_today: `${
					isLoading ? "bg-muted" : "!bg-blue-500"
				} text-accent-foreground`,
				day_outside: `${
					isLoading
						? "animate-pulse rounded-md bg-muted"
						: "day-outside opacity-50 text-muted-foreground"
				} aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30`,
				day_disabled: `${
					isLoading
						? "animate-pulse rounded-md bg-muted"
						: "day-outside opacity-50 text-muted-foreground"
				}`,
				day_range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				day_hidden: "invisible",
				...classNames,
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
				IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
			}}
			{...props}
		/>
	);
}
CalendarDashboardUI.displayName = "Calendar";

export { CalendarDashboardUI };
