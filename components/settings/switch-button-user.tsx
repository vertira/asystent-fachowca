"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateUserPermissions } from "@/lib/server-actions";
import { useState } from "react";

export function SwitchButtonUser({ employe }: { employe: any }) {
  const [calendar, setCalendar] = useState<boolean>(
    employe.permissions.calendar,
  );
  const [warehouse, setWarehouse] = useState<boolean>(
    employe.permissions.warehouse,
  );
  const [createWork, setCreateWork] = useState<boolean>(
    employe.permissions.createWork,
  );
  const [editWork, setEditWork] = useState<boolean>(
    employe.permissions.editWork,
  );
  return (
    <div className="grid grid-cols-2 gap-5 mx-auto ">
      <div className="flex items-center gap-2">
        <Switch
          id="calendar"
          checked={calendar}
          onCheckedChange={async () => {
            try {
              await updateUserPermissions(employe.id, "calendar");
              setCalendar((prev: any) => !prev);
            } catch {
              console.log("ERROR");
            }
          }}
        />
        <Label
          htmlFor="calendar"
          className={`${!calendar && "text-myText-muted"}`}
        >
          Kalendarz
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="warehouse"
          checked={warehouse}
          onCheckedChange={async () => {
            try {
              await updateUserPermissions(employe.id, "warehouse");
              setWarehouse((prev: any) => !prev);
            } catch {
              console.log("ERROR");
            }
          }}
        />
        <Label
          htmlFor="warehouse"
          className={`${!warehouse && "text-myText-muted"}`}
        >
          Magazyn
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="createWork"
          checked={createWork}
          onCheckedChange={async () => {
            try {
              await updateUserPermissions(employe.id, "createWork");
              setCreateWork((prev: any) => !prev);
            } catch {
              console.log("ERROR");
            }
          }}
        />
        <Label
          htmlFor="createWork"
          className={`${!createWork && "text-myText-muted"}`}
        >
          Tworzenie nowych prac
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="editWork"
          checked={editWork}
          onCheckedChange={async () => {
            try {
              await updateUserPermissions(employe.id, "editWork");
              setEditWork((prev: any) => !prev);
            } catch {
              console.log("ERROR");
            }
          }}
        />
        <Label
          htmlFor="editWork"
          className={`${!editWork && "text-myText-muted"}`}
        >
          Edytowanie prac
        </Label>
      </div>
    </div>
  );
}
