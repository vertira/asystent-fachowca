import { Card, CardContent } from "@/components/ui/card";
import { Scrambles } from "./code";
import LastCodes from "./last-codes";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import { Info } from "lucide-react";

export default function NewEmployee({
	registrationCodes,
	isPremium,
	employees,
}: {
	registrationCodes: any;
	isPremium: any;
	employees: any;
}) {
	return (
		<Card className="bg-cardBackground borderColor lg:col-span-2 flex items-center ">
			<CardContent className="flex flex-col w-full justify-start gap-5 px-6 py-3">
				<div className="flex flex-col ">
					<div className="text-first-muted text-2xl self-start font-semibold leading-none tracking-tight">
						Nowy pracownik:
						<TooltipProvider>
							<Tooltip delayDuration={200}>
								<TooltipTrigger>
									<div className="flex items-center">
										<sup>
											<Info size={14} className="text-myText ml-1" />
										</sup>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-myText text-balance text-center">
										{isPremium ? (
											<span>
												Możesz mieć tylko 3 aktywne kody naraz!
												<br />
												Kod generowany jest na 24h
											</span>
										) : (
											<span>
												Możesz dodać maksymalnie jednego pracownika, kod jest
												ważny 24h!
											</span>
										)}
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className="flex flex-col justify-center w-full ">
						<Scrambles
							registrationCodes={registrationCodes}
							isPremium={isPremium}
							employees={employees}
						/>
						<LastCodes registrationCodes={registrationCodes} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
