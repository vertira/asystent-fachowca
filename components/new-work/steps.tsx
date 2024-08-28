"use client";
import React, { useState, useCallback } from "react";
import { MoveLeft } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { steps } from "./steps-content";
import { Step } from "./active-step-side";
import { useToast } from "../ui/use-toast";
import { creatework } from "@/lib/server-actions";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";

const RegistrationSteps = ({ works }: any) => {
	const [activeStep, setActiveStep] = useState(1);
	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [address, setAddress] = useState("");
	const [uploadedMap, setUploadedMap] = useState<string>("");
	const [contact, setContact] = useState("");
	const [uploadedWorkImages, setUploadedWorkImages] = useState<string[]>([]);
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});
	const [workId, setWorkId] = useState<string>("");
	const router = useRouter();
	const { toast } = useToast();
	const nextStep = useCallback(() => {
		if (activeStep === 1 && name.length < 4) {
			toast({
				variant: "destructive",
				title: "Wystąpił problem",
				description: "Sprawdź czy wypełniłeś wszystkie pola!",
			});
			return;
		}

		if (activeStep === 2 && selectedCategories.length < 1) {
			toast({
				variant: "destructive",
				title: "Wystąpił problem",
				description: "Musisz wyrać przynajmniej jedną kategorie!",
			});
			return;
		}

		if (activeStep === 3 && address.length < 10) {
			toast({
				variant: "destructive",
				title: "Wystąpił problem",
				description: "Upewnij się, że wpisałeś adres i minimum 10 znaków.",
			});
			return;
		}
		if (activeStep === 3 && uploadedMap.length < 0) {
			toast({
				variant: "destructive",
				title: "Wystąpił problem",
				description: "Wpisałeś błędny adres lub mapa nie została załadowana.",
			});
			return;
		}
		if (activeStep === 5 && !date) {
			toast({
				variant: "destructive",
				title: "Wystąpił problem",
				description: "Użytkownik z takim adresem email już istnieje!",
			});
			return;
		}
		setActiveStep((prev) => prev + 1);
	}, [activeStep, name, selectedCategories, address, contact, date]);

	const prevStep = useCallback(() => {
		setActiveStep((prev) => prev - 1);
	}, []);
	const handleSubmit = async () => {
		const { formattedFrom, formattedTo } = formatDateRange(date);
		const parsedDates = parseDateRange({ formattedFrom, formattedTo });
		try {
			const work = await creatework({
				name,
				slug,
				address,
				contact,
				mapWork: uploadedMap,
				status: "ACTIVE",
				startDate: parsedDates.from,
				endDate: parsedDates.to,
				images: uploadedWorkImages,
				category: selectedCategories,
			});
			setWorkId(work.id);
		} catch (error) {
			console.log(error);
		} finally {
			setActiveStep(7);
			setName("");
			setSlug("");
			setSelectedCategories([]);
			setAddress("");
			setUploadedMap("");
			setContact("");
			setUploadedWorkImages([]);
			setDate({
				from: undefined,
				to: undefined,
			});
		}
	};

	return (
		<div className="flex flex-col md:flex-row overflow-x-hidden  h-screen bg-myBackground">
			{activeStep !== 7 && (
				<div className="w-full md:max-w-sm relative z-10 border-r borderColor md:rounded-tr-xl  p-6 text-myText">
					<div className="w-full h-full bg-cardBackground/40 -z-10 absolute md:rounded-tr-xl top-0 left-0"></div>
					<div className="glassPattern4 w-full h-full absolute top-0 left-0 md:rounded-tr-xl"></div>
					<Button
						variant="ghostsecond"
						size="sm"
						className="gap-2 mb-5 "
						onClick={() => router.push("/")}
					>
						<MoveLeft />
						Powrót do strony głównej
					</Button>
					<h2 className="text-2xl font-bold mb-4">Tworzenie nowego projektu</h2>
					<p className="text-sm mb-8 hidden md:block">
						Przejdź przez wszystkie kroki, aby stworzyć swój projekt budowlany.
					</p>
					<div className="flex flex-row md:flex-col justify-between mx-auto md:justify-start overflow-x-hidden w-full">
						{steps.map((step) =>
							step.number === 7 ? (
								""
							) : (
								<Step
									key={step.number}
									{...step}
									isActive={step.number === activeStep}
									isCompleted={step.number < activeStep}
									activeStep={activeStep}
								/>
							)
						)}
					</div>
				</div>
			)}
			<div className="w-full flex-1 p-px">
				<div
					className={cn(
						activeStep === 7 && "h-full max-h-screen overflow-hidden",
						activeStep !== 7 &&
							"grid grid-cols-1 relative py-12 px-5 z-10 max-w-4xl min-h-screen h-full bg-transparent flex-1 w-full mx-auto"
					)}
				>
					<div className="flex flex-col h-full flex-1 ">
						{steps[activeStep - 1].content({
							name,
							setName,
							slug,
							setSlug,
							works,
							router,
							setActiveStep,
							selectedCategories,
							setSelectedCategories,
							setContact,
							address,
							setAddress,
							contact,
							uploadedWorkImages,
							setUploadedWorkImages,
							date,
							setDate,
							setUploadedMap,
							workId,
						})}
					</div>
					{activeStep !== 7 && (
						<div
							className={`flex ${
								activeStep === 1 ? "justify-end " : "justify-between"
							} font-medium lg:items-end items-start mt-5 h-fit`}
						>
							{activeStep > 1 && (
								<Button className="" variant="ghostsecond" onClick={prevStep}>
									Wstecz
								</Button>
							)}
							<Button
								variant="ghostsecond"
								className=""
								onClick={activeStep === 6 ? handleSubmit : nextStep}
							>
								{activeStep === 6 ? "Utwórz projekt" : "Dalej"}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const formatDateRange = (
	date: DateRange | undefined
): {
	formattedFrom?: string;
	formattedTo?: string;
} => {
	const result: { formattedFrom?: string; formattedTo?: string } = {};

	if (date?.from) {
		result.formattedFrom = format(date.from, "LLL dd, y", { locale: pl });
	}
	if (date?.to) {
		result.formattedTo = format(date.to, "LLL dd, y", { locale: pl });
	}

	return result;
};
export const parseDateRange = (formattedDateRange: {
	formattedFrom?: string;
	formattedTo?: string;
}): { from: Date; to: Date } => {
	const dateFormat = "MMM dd, yyyy"; // Użyty format daty

	const result: { from: Date; to: Date } = {
		from: new Date(),
		to: new Date(),
	};

	if (formattedDateRange.formattedFrom) {
		result.from = parse(
			formattedDateRange?.formattedFrom,
			dateFormat,
			new Date(),
			{ locale: pl }
		);
	}
	if (formattedDateRange.formattedTo) {
		result.to = parse(formattedDateRange.formattedTo, dateFormat, new Date(), {
			locale: pl,
		});
	}

	return result;
};
export default RegistrationSteps;
