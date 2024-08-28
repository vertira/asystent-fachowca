import React from "react";
interface HeadingText {
	text: string;
}
function HeadingHomepage({ text }: HeadingText) {
	return (
		<div className=" w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
			<h1 className="md:text-4xl text-3xl lg:text-4xl font-extrabold text-center text-first-muted tracking-tight relative z-20">
				{text}
			</h1>
			<div className="w-full h-2 relative flex justify-center">
				<div className="absolute mx-auto top-0 bg-gradient-to-r from-transparent via-orange-600 to-transparent h-[2px] w-1/4 blur-sm" />
				<div className="absolute mx-auto top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-1/2" />
				<div className="absolute mx-auto top-0 bg-gradient-to-r from-transparent via-orange-600 to-transparent h-[2px] w-1/2 blur-sm" />
				<div className="absolute mx-auto top-0 bg-gradient-to-r from-transparent via-orange-600 to-transparent h-px w-1/2" />
			</div>
		</div>
	);
}

export default HeadingHomepage;
