"use client";
import { CheckCircle2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const Step = ({
	number,
	title,
	description,
	isActive,
	isCompleted,
	activeStep,
}: {
	number: number;
	title: string;
	description: string;
	isActive: boolean;
	isCompleted: boolean;
	activeStep: number;
}) => {
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	if (isMobile) {
		const shouldDisplayMobile =
			activeStep === number - 1 ||
			activeStep === number ||
			activeStep === number + 1;

		if (!shouldDisplayMobile) {
			return null;
		}
	}
	return (
		<div
			className={`flex flex-col md:flex-row justify-center md:justify-start items-center md:mb-4 px-4 select-none ${
				isActive
					? "text-neutral-50"
					: isCompleted
					? " text-neutral-400 "
					: " text-neutral-300 "
			}`}
		>
			<div
				className={`flex items-center relative overflow-hidden bg-transparent border text-neutral-50 justify-center min-w-8 min-h-8 rounded-full md:mr-3 ${
					isActive
						? "border-none text-black"
						: isCompleted
						? " text-neutral-50 border-none"
						: " text-gray-500"
				}`}
			>
				{isActive ? (
					<>
						<span className="absolute inset-[-100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#eef2ff_0%,#ff7400_50%,#eef2ff_100%)]" />
						<span className="inline-flex h-[95%] w-[95%] cursor-pointer items-center justify-center rounded-full bg-cardBackground/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
							{isCompleted ? (
								<CheckCircle2 size={16} />
							) : (
								<span className="flex justify-center items-center h-full w-full">
									{number}
								</span>
							)}
						</span>
					</>
				) : isCompleted ? (
					<CheckCircle2 size={16} />
				) : (
					number
				)}
			</div>
			<div>
				<p className="font-semibold text-sm md:text-base text-center md:text-start">
					{title}
				</p>
				<p className="text-sm hidden md:block">{description}</p>
			</div>
		</div>
	);
};
