"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "../ui/label"
import { useState } from "react"
import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { GoPlus } from "react-icons/go"
import { createShoppingList } from "@/lib/server-actions"
import { mutate } from "swr"
import { toast } from "../ui/use-toast"
export function AddCustomMaterial({
    value,
    work,
    setSearch,
    setOpen,
}: {
    value: string
    work: any
    setSearch: any
    setOpen: any
}) {
    const [materialName, setMaterialName] = useState("")
    const [unit, setUnit] = useState("")
    const [quantity, setQuantity] = React.useState<number>(0)
    React.useEffect(() => {
        setMaterialName(value)
    }, [value])
    console.log(materialName, unit, quantity, work.userId, work.id)
    const addCustomMaterial = async () => {
        try {
            const res = await createShoppingList(
                materialName,
                unit,
                quantity,
                work.userId,
                work.id,
            )
            if (res?.status === "EXIST") {
                toast({
                    variant: "destructive",
                    title: `Materiał o nazwie ${materialName} już isnieje w tej tabeli!`,
                })
                return
            }
            setOpen(false)
            setSearch("")
            mutate("getShoppingList")
        } catch {
            console.log("ERROR")
        }
    }
    return (
        <Drawer onClose={() => setSearch("")}>
            <DrawerTrigger asChild>
                <Button variant="ghostsecond" className="gap-3 text-first">
                    <span className="hidden lg:flex">Dodaj</span>
                    <GoPlus />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="borderColor border bg-cardBackground">
                <DrawerHeader className="flex w-full flex-col items-center">
                    <DrawerTitle>Materiał do listy zakupów!</DrawerTitle>
                    <DrawerDescription className="text-myText-muted">
                        Dodaj materiał do listy zakupów
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex w-full flex-col items-center gap-2">
                    <div className="flex w-3/4 flex-col items-start gap-1.5 lg:w-1/5">
                        <Label htmlFor="material">Nazwa materiału</Label>
                        <Input
                            type="text"
                            id="material"
                            name="material"
                            autoComplete="off"
                            value={materialName}
                            onChange={(e) => setMaterialName(e.target.value)}
                        />
                    </div>
                    <div className="flex w-3/4 flex-row items-center gap-5 lg:w-1/5">
                        <div className="flex flex-col">
                            <Label htmlFor="amount" className="h-5">
                                Ilość
                            </Label>
                            <Input
                                autoComplete="off"
                                type="number"
                                id="amount"
                                name="amount"
                                value={quantity}
                                min={1}
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value))
                                }
                            />
                        </div>
                        <Select
                            name="unit"
                            value={unit}
                            onValueChange={setUnit}
                        >
                            <SelectTrigger className="relative mt-5 w-[180px]">
                                <Label
                                    htmlFor="amount"
                                    className="absolute -top-5 left-0 h-5"
                                >
                                    Jednostka
                                </Label>
                                <SelectValue placeholder="Jednostka" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="m" className="text-base">
                                        m
                                    </SelectItem>
                                    <SelectItem
                                        value="m2"
                                        className="text-base"
                                    >
                                        m<sup>2</sup>
                                    </SelectItem>
                                    <SelectItem
                                        value="m3"
                                        className="text-base"
                                    >
                                        m<sup>3</sup>
                                    </SelectItem>
                                    <SelectItem
                                        value="ml"
                                        className="text-base"
                                    >
                                        ml
                                    </SelectItem>
                                    <SelectItem value="l" className="text-base">
                                        L
                                    </SelectItem>
                                    <SelectItem value="g" className="text-base">
                                        g
                                    </SelectItem>
                                    <SelectItem
                                        value="kg"
                                        className="text-base"
                                    >
                                        kg
                                    </SelectItem>
                                    <SelectItem
                                        value="szt"
                                        className="text-base"
                                    >
                                        szt
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        onClick={addCustomMaterial}
                        variant="ghostsecond"
                        type="submit"
                        className="my-4 flex w-3/4 items-center justify-center gap-4 rounded-md border px-10 py-2 lg:w-1/5"
                    >
                        <GoPlus className="text-xl" />
                        Dodaj
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
