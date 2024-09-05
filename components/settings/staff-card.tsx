import { Card, CardContent } from "@/components/ui/card";
import StaffCardContent from "./staff-card-content";

export default function StaffCard({ employerId }: { employerId: string }) {
  return (
    <Card className="bg-cardBackground borderColor flex lg:col-span-2 items-center ">
      <CardContent className="flex items-center justify-start gap-5 px-6 py-3">
        <p className="text-first-muted text-2xl font-semibold leading-none tracking-tight">
          Pracownik użytkownika:
        </p>
        <StaffCardContent employerId={employerId} />
      </CardContent>
    </Card>
  );
}
