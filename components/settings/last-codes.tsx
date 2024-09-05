import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { IoTrashBinOutline } from "react-icons/io5";
import DeleteButton from "./delete-Button";
export default function LastCodes({
  registrationCodes,
}: {
  registrationCodes: any;
}) {
  const data = registrationCodes;
  return (
    <Table className="my-10">
      <TableHeader className="w-full">
        <TableRow>
          <TableHead className="text-first">Kod</TableHead>
          <TableHead className="text-center text-first border-l borderColor">
            Użyty/Wygasły ?
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell className="border-r borderColor text-myText p-0 pl-4">
              Tutaj pojawi się kod
            </TableCell>
            <TableCell className="text-center border-l borderColor text-myText">
              Tutaj pojawi się czy kod jest wykorzystany
            </TableCell>
            <TableCell className="p-0">
              <Button
                variant="ghostsecond"
                size="sm"
                className="opacity-0 cursor-none "
              >
                <IoTrashBinOutline className="text-lg " />
              </Button>
            </TableCell>
          </TableRow>
        ) : (
          <>
            {data.map((item: any) => (
              <TableRow key={item.code}>
                <TableCell className="p-0 pl-4 text-myText">
                  {item.code}
                </TableCell>
                <TableCell className="text-center text-myText border-l borderColor p-0 pl-4">
                  {item.used
                    ? "Użyty"
                    : new Date() > item.expiresAt
                      ? "Wygasły"
                      : "Aktywny"}
                </TableCell>
                <TableCell className="p-2">
                  <DeleteButton item={item} />
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}
