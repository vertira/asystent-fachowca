import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import SpinnerCustom from "../ui/spinner-custom"
import { Badge } from "../ui/badge"

export default function EmployeesCard({ employees }: { employees: any }) {
    return (
        <Card className="borderColor flex items-center bg-cardBackground lg:col-span-2">
            <CardContent className="flex w-full flex-col items-center justify-start gap-5 px-6 py-3 lg:flex-row">
                <div className="flex w-full flex-col items-center gap-5">
                    <p className="self-start text-2xl font-semibold leading-none tracking-tight text-first-muted">
                        Pracownicy:
                    </p>
                    <div className="flex w-full flex-wrap justify-center gap-5 md:justify-between">
                        {employees?.map((employee: any) => (
                            <div
                                className="flex items-center gap-3"
                                key={employee.id}
                            >
                                <div className="relative flex">
                                    <Avatar className="z-10 ring-1 ring-first-muted ring-offset-2 ring-offset-myBackground">
                                        <AvatarImage src={employee.image} />
                                        <AvatarFallback>
                                            <SpinnerCustom />
                                        </AvatarFallback>
                                    </Avatar>
                                    <Badge className="pointer-events-none absolute -top-2 z-0 translate-x-2/3 select-none bg-indigo-700 px-1.5 py-[0.1px]">
                                        STAFF
                                    </Badge>
                                </div>
                                <span className="mt-1 text-2xl font-semibold leading-none tracking-tight text-myText">
                                    {employee.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
