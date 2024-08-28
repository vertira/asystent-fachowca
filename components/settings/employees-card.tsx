import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SpinnerCustom from "../ui/spinner-custom";
import { Badge } from "../ui/badge";

export default function EmployeesCard({ employees }: { employees: any }) {
	return (
		<Card className="bg-cardBackground borderColor lg:col-span-2 flex items-center ">
			<CardContent className="flex flex-col lg:flex-row items-center w-full justify-start gap-5 px-6 py-3">
				<div className="flex flex-col w-full items-center gap-5">
					<p className="text-first-muted text-2xl self-start font-semibold leading-none tracking-tight">
						Pracownicy:
					</p>
					<div className="flex flex-wrap md:justify-between justify-center gap-5 w-full">
						{employees?.map((employee: any) => (
							<div className="flex items-center gap-3" key={employee.id}>
								<div className="flex relative">
									<Avatar className="ring-1 ring-offset-2 ring-offset-myBackground z-10 ring-first-muted">
										<AvatarImage src={employee.image} />
										<AvatarFallback>
											<SpinnerCustom />
										</AvatarFallback>
									</Avatar>
									<Badge className="bg-indigo-700 absolute -top-2 translate-x-2/3 z-0 px-1.5 py-[0.1px] select-none pointer-events-none">
										STAFF
									</Badge>
								</div>
								<span className="text-myText text-2xl mt-1 font-semibold leading-none tracking-tight">
									{employee.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
