"use client";
import { CalendarDashboardUI } from "../ui/calendar-dashboard-ui";
import { pl } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getActiveWorks } from "@/lib/server-actions";

export function CalendarDashboard() {
	const [isLoading, setIsLoading] = useState(true);
	const [works, setWorks] = useState<any>([]);
	const [date, setDate] = useState<Date | undefined>(new Date());
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const worksData = await getActiveWorks();

				setWorks(worksData);
			} catch (error) {
				console.error("Wystąpił błąd podczas ładowania danych:", error);
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);
	const today = new Date();
	return (
		<>
			<CalendarDashboardUI
				disabled={{
					before: today,
				}}
				isLoading={isLoading}
				works={works}
				mode="single"
				locale={pl}
				selected={date}
				onSelect={setDate}
				className="rounded-md bg-cardBackground/90 border borderColor w-full h-fit"
			/>
		</>
	);
}
