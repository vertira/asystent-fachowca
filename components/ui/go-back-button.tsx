"use client";
import React from "react";
import { Button } from "./button";
import { PiArrowLeft } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
	const router = useRouter();
	return (
		<Button
			variant="ghostsecond"
			className="flex gap-x-4 border-none"
			onClick={() => router.back()}
		>
			<PiArrowLeft className="text-2xl text-gray-500" />
			<p>Wróć</p>
		</Button>
	);
}
