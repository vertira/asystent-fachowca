"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GoPlus } from "react-icons/go";
import {
  createWorkMaterial,
  deleteWorkMaterial,
  getMaterialByUserId,
  getShoppingList,
  getWorkMaterials,
} from "@/lib/server-actions";
import useSWR, { mutate } from "swr";
import { MaterialTable } from "./material-table";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Materials } from "@/types/material";
import Spinner from "../ui/spinner";
import { useEffect, useState } from "react";
import { AddCustomMaterial } from "./add-to-shopList";
import { toast } from "../ui/use-toast";

const fetchWarehouseMaterials = async (): Promise<Materials[]> => {
  return await getMaterialByUserId();
};
const fetchUsedMaterialsWork = async (work: any): Promise<Materials[]> => {
  return await getWorkMaterials(work);
};
const fetchShoppingList = async (work: any): Promise<Materials[]> => {
  return await getShoppingList(work);
};

export function MaterialAssign({ work }: { work: any }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [materialId, setMaterialId] = useState("");
  const [availableMaterials, setAvailableMaterials] = useState<Materials[]>([]);
  const [materialsTable, setMaterialsTable] = useState<Materials[]>([]);
  const [materialsFromWareHouse, setMaterialsFromWarehouse] = useState<
    Materials[]
  >([]);
  const [shoppingList, setShoppingList] = useState<Materials[]>([]);
  const { data: dataFromWarehouse, isLoading } = useSWR<Materials[]>(
    "getMaterialByUserId",
    fetchWarehouseMaterials,
  );
  const { data: dataWorkMaterialList } = useSWR<Materials[]>(
    "getWorkMaterials",
    () => fetchUsedMaterialsWork(work),
  );
  const { data: dataShoppingList } = useSWR<Materials[]>(
    "getShoppingList",
    () => fetchShoppingList(work),
  );
  const addMaterial = async () => {
    try {
      if (value && quantity && unit) {
        const result = await createWorkMaterial(
          value,
          quantity,
          unit,
          materialId,
          work.userId,
          work.id,
        );
        if (result?.status === "ERROR") {
          toast({
            variant: "destructive",
            title: `Nie ma wystarczającej ilości w magazynie`,
          });
        } else if (result?.status === "ZERO") {
          toast({
            variant: "destructive",
            title: `Nie możesz dodać 0 do listy !`,
          });
        }
        mutate("getWorkMaterials");
        setOpen(false);
        setSearch("");
        setValue("");
        setQuantity(0);
      } else {
        toast({
          variant: "destructive",
          title: "Nie wypełniłeś wszystkich pól przy dodawaniu materiału",
        });
      }
    } catch {
      console.log("ERROR");
    }
  };
  const deleteMaterial = async (
    id: string,
    materialId: string,
    quantity: number,
    name: string,
  ) => {
    try {
      await deleteWorkMaterial(id, materialId, quantity);
      mutate("getWorkMaterials");
      mutate("getShoppingList");
      toast({
        variant: "success",
        title: `Pomyślnie usunięto ${name}`,
      });
    } catch {
      console.log("ERROR");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dataFromWarehouse) {
          setAvailableMaterials(dataFromWarehouse);
        }
        if (dataWorkMaterialList) {
          setMaterialsFromWarehouse(dataWorkMaterialList);
        }
        if (dataShoppingList) {
          setShoppingList(dataShoppingList);
        }
      } catch {
        console.log("ERROR");
      }
    };

    fetchData();
  }, [dataFromWarehouse, dataWorkMaterialList, dataShoppingList]);
  useEffect(() => {
    setMaterialsTable([...materialsFromWareHouse, ...shoppingList]);
  }, [materialsFromWareHouse, shoppingList]);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex gap-5 mt-12 relative items-center w-full">
            <div className="basis-1/2">
              <Label
                htmlFor="material"
                className="absolute text-first -translate-y-full text-lg  font-medium leading-loose peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Materiał
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghostsecond"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? availableMaterials.find((item) => item.name === value)
                          ?.name
                      : "Znajdz materiał..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="bg-cardBackground border borderColor"
                  side="bottom"
                  align="start"
                >
                  <Command
                    className="bg-cardBackground text-myText "
                    value={value}
                  >
                    <CommandInput
                      id="material"
                      name="material"
                      placeholder="Szukaj..."
                      className="text-base text-myText"
                      value={search}
                      onValueChange={(search) => setSearch(search)}
                    />
                    <CommandList>
                      <CommandEmpty className="flex flex-col max-w-sm">
                        <span className="p-4">
                          Brak wyszukanego materiału w magazynie,ale możesz go
                          dodac do listy zakupów!
                        </span>
                        <AddCustomMaterial
                          value={search}
                          setOpen={setOpen}
                          setSearch={setSearch}
                          work={work}
                        />
                      </CommandEmpty>
                      <CommandGroup className="borderColor">
                        {availableMaterials
                          .filter(
                            (item) =>
                              !materialsFromWareHouse.some(
                                (workItem) => workItem.materialId === item.id,
                              ),
                          )
                          .map(
                            (item) =>
                              item.quantity > 0 && (
                                <CommandItem
                                  className="text-myText-muted hover:bg-first-muted/30"
                                  key={item.id}
                                  value={item.name}
                                  onSelect={(currentValue) => {
                                    setValue(
                                      currentValue === value
                                        ? ""
                                        : currentValue,
                                    );
                                    setQuantity(item.quantity);
                                    setUnit(item.unit);
                                    setMaterialId(item.id!);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "h-4 w-30",
                                      value === item.name
                                        ? "opacity-100 mr-2"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex justify-between w-full">
                                    <span className="text-base">
                                      {item.name}
                                    </span>
                                    <span className="pl-20 text-myText-muted">
                                      Stan:
                                      <span className="font-bold ml-2 text-first-muted">
                                        {item.quantity}
                                        {item.unit}
                                      </span>
                                    </span>
                                  </div>
                                </CommandItem>
                              ),
                          )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-10 w-1/2 items-center">
              <div className="flex flex-col relative w-2/3">
                <Label
                  htmlFor="quantity"
                  className="absolute -translate-y-full text-lg leading-loose"
                >
                  Ilość
                </Label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  min={1}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <Button
                variant="ghostsecond"
                size="lg"
                className="hidden lg:flex"
                onClick={addMaterial}
              >
                <GoPlus className="text-xl" />
                Dodaj materiał
              </Button>
              <Button
                variant="ghostsecond"
                size="icon"
                className="lg:hidden w-1/3"
                onClick={addMaterial}
              >
                <GoPlus className="text-xl" />
              </Button>
            </div>
          </div>
          <MaterialTable
            materialsTable={materialsTable}
            deleteMaterial={deleteMaterial}
          />
        </>
      )}
    </>
  );
}
