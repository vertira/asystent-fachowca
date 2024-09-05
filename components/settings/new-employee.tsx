import { Card, CardContent } from "@/components/ui/card"
import { Scrambles } from "./code"
import LastCodes from "./last-codes"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip"
import { Info } from "lucide-react"

export default function NewEmployee({
    registrationCodes,
    isPremium,
    employees,
}: {
    registrationCodes: any
    isPremium: any
    employees: any
}) {
    return (
        <Card className="borderColor flex items-center bg-cardBackground lg:col-span-2">
            <CardContent className="flex w-full flex-col justify-start gap-5 px-6 py-3">
                <div className="flex flex-col">
                    <div className="self-start text-2xl font-semibold leading-none tracking-tight text-first-muted">
                        Nowy pracownik:
                        <TooltipProvider>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger>
                                    <div className="flex items-center">
                                        <sup>
                                            <Info
                                                size={14}
                                                className="ml-1 text-myText"
                                            />
                                        </sup>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-balance text-center text-myText">
                                        {isPremium ? (
                                            <span>
                                                Możesz mieć tylko 3 aktywne kody
                                                naraz!
                                                <br />
                                                Kod generowany jest na 24h
                                            </span>
                                        ) : (
                                            <span>
                                                Możesz dodać maksymalnie jednego
                                                pracownika, kod jest ważny 24h!
                                            </span>
                                        )}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex w-full flex-col justify-center">
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
    )
}
