"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundCellAnimation = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className="relative h-full bg-myBackground flex justify-center overflow-hidden">
			<BackgroundCellCore />
			<div className="relative z-50 h-full w-full xl:w-4/5 select-none">
				{children}
			</div>
		</div>
	);
};

const BackgroundCellCore = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const ref = useRef<any>(null);

	const handleMouseMove = (event: any) => {
		const rect = ref.current && ref.current.getBoundingClientRect();
		setMousePosition({
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		});
	};

	const size = 200;
	return (
		<div
			ref={ref}
			onMouseMove={handleMouseMove}
			className="h-full absolute inset-0 z-[50]"
		>
			<div className="absolute h-full inset-y-0  overflow-hidden">
				<div className="absolute h-screen top-0 w-full pointer-events-none z-40 bg-myBackground [mask-image:linear-gradient(to_top,transparent,white)]"></div>
				<div
					className="absolute inset-0 z-[41] bg-transparent"
					style={{
						maskImage: `radial-gradient(
            ${size / 4}px circle at center,
           white, transparent
          )`,
						WebkitMaskImage: `radial-gradient(
          ${size / 4}px circle at center,
          white, transparent
        )`,
						WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
							mousePosition.y - size / 2
						}px`,
						WebkitMaskSize: `${size}px`,
						maskSize: `${size}px`,
						pointerEvents: "none",
						maskRepeat: "no-repeat",
						WebkitMaskRepeat: "no-repeat",
					}}
				></div>
				{/* <Pattern className="opacity-[1]" cellClassName="border-myText-muted/20 rounded-xl"  /> */}
			</div>
		</div>
	);
};

// 
