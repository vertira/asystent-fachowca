"use client";

import { TextGenerateEffect } from "./typewriter-effect";

export function TypewriterEffectSection2() {
	const words = [
		{
			text: "Zacznij",
			className: "text-myText",
		},
		{
			text: "teraz",
			className: "text-first-muted",
		},
		{
			text: "i",
			className: "text-myText",
		},
		{
			text: "korzystaj",
			className: "text-myText",
		},
		{
			text: "za",
			className: "text-myText",
		},
		{
			text: "darmo",
			className: "text-first-muted",
		},
		{
			text: "!",
			className: "text-myText",
		},
	];
	return (
		<div className="w-full leading-normal text-xl sm:text-2xl md:text-4xl text-nowrap lg:text-6xl xl:text-6xl 2xl:text-7xl  font-extrabold mx-auto text-center py-5">
			<TextGenerateEffect words={words} />
		</div>
	);
}
