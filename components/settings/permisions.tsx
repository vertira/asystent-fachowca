import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SpinnerCustom from "../ui/spinner-custom";
import { Badge } from "../ui/badge";
import { SwitchButtonUser } from "./switch-button-user";
import { Card, CardContent } from "../ui/card";

export function Permisions({ employees }: { employees: any }) {
	return (
		<Card className="bg-cardBackground borderColor lg:col-span-2 flex items-center ">
			<CardContent className="flex flex-col w-full justify-start gap-5 px-6 py-3 h-full">
				<div className="text-first-muted text-2xl self-start font-semibold leading-none tracking-tight">
					Zarządzaj uprawnieniami użytkowników:
				</div>
				<Accordion type="single" collapsible className="w-full">
					{employees.map((employe: any) => {
						return (
							<AccordionItem
								value={employe.id}
								key={employe.id}
								className="borderColor"
							>
								<AccordionTrigger>
									<div className="flex items-center gap-3">
										<div className="flex relative">
											<Avatar className="ring-1 ring-offset-2 ring-offset-myBackground z-10 ring-first-muted">
												<AvatarImage src={employe.image} />
												<AvatarFallback>
													<SpinnerCustom />
												</AvatarFallback>
											</Avatar>
											<Badge className="bg-indigo-700 absolute -top-2 translate-x-2/3 z-0 px-1.5 py-[0.1px] select-none pointer-events-none">
												STAFF
											</Badge>
										</div>
										<span className="text-myText text-2xl mt-1 font-semibold leading-none tracking-tight">
											{employe.name}
										</span>
									</div>
								</AccordionTrigger>
								<AccordionContent className="my-3 px-2">
									<SwitchButtonUser employe={employe} />
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
			</CardContent>
		</Card>
	);
}
