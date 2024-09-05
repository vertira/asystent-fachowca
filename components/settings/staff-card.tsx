import { Card, CardContent } from "@/components/ui/card"
import StaffCardContent from "./staff-card-content"

export default function StaffCard({ employerId }: { employerId: string }) {
    return (
        <Card className="borderColor flex items-center bg-cardBackground lg:col-span-2">
            <CardContent className="flex items-center justify-start gap-5 px-6 py-3">
                <p className="text-2xl font-semibold leading-none tracking-tight text-first-muted">
                    Pracownik użytkownika:
                </p>
                <StaffCardContent employerId={employerId} />
            </CardContent>
        </Card>
    )
}
