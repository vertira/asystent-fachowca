"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "./animated-list";

interface Item {
	name: string;
	description: string;
	icon: string;
	color: string;
	time: string;
}

let notifications = [
	{
		name: "Planowanie",
		description: "Planuj etapy prac budowlanych",
		time: "15m temu",
		icon: "👷‍♂️",
		color: "#00C9A7",
	},
	{
		name: "Mobilny dostęp",
		description: "Zarządzaj projektem z dowolnego miejsca",
		time: "10m temu",
		icon: "💻",
		color: "#FFB800",
	},
	{
		name: "Szybka wycena",
		description: "Korzystaj z kalkulatora wycen",
		time: "5m ago",
		icon: "💸",
		color: "#FF3D71",
	},
	{
		name: "Uwiecznij prace",
		description: "Zapisuj zdjęcia swoich projektów",
		time: "2m ago",
		icon: "📷",
		color: "#1E86FF",
	},
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
	return (
		<figure
			className={cn(
				"relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
				// animation styles
				"transition-all duration-200 ease-in-out hover:scale-[103%]",
				// dark styles
				"transform-gpu bg-cardBackground/30 dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-50px_#ff7400_inset]"
			)}
		>
			<div className="flex flex-row items-center gap-3">
				<div
					className="flex h-10 w-10 items-center justify-center rounded-2xl"
					style={{
						backgroundColor: color,
					}}
				>
					<span className="text-lg">{icon}</span>
				</div>
				<div className="flex flex-col overflow-hidden">
					<figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-myText">
						<span className="text-sm sm:text-lg">{name}</span>
						<span className="mx-1">·</span>
						<span className="text-xs text-myText-muted">{time}</span>
					</figcaption>
					<p className="text-sm font-normal text-myText-muted">
						{description}
					</p>
				</div>
			</div>
		</figure>
	);
};

export function FeaturesCard() {
	return (
		<div className="relative z-10 flex max-h-[400px] min-h-[430px] sm:min-h-[400px] flex-col overflow-hidden bg-transparent p-6 ">
			<AnimatedList>
				{notifications.map((item, idx) => (
					<Notification {...item} key={idx} />
				))}
			</AnimatedList>
		</div>
	);
}
