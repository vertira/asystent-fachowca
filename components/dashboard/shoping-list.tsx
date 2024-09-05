"use client"
import Image from "next/image"
import React, { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOutsideClick } from "@/hooks/use-outside-click"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Scroll, X } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import SpinnerCustom from "../ui/spinner-custom"
import { Badge } from "../ui/badge"

export function ShopingList({ works }: { works: any }) {
    const [active, setActive] = useState<
        (typeof cards)[number] | boolean | null
    >(null)
    const ref = useRef<HTMLDivElement>(null)
    const id = useId()
    const cards = works.map((work: any) => ({
        description: work.address,
        title: work.name,
        src:
            work.images.length > 0
                ? work.images[0].url
                : "/icons/icon-192x192.png",
        ctaText: "Podgląd",
        ctaLink: `/edit/${work.id}`,
        content: () => {
            const materialsFromShop = work.ShoppingList
            const materialsFromWarehouse = work.warehouseList
            const materialTable = [
                ...materialsFromShop,
                ...materialsFromWarehouse,
            ]
            return (
                <div className="h-full w-full">
                    <Card className="borderColor flex items-center bg-cardBackground lg:col-span-2">
                        <CardContent className="flex w-full flex-col items-center justify-start gap-5 px-6 py-3 lg:flex-row">
                            <div className="flex w-full flex-row items-center justify-center gap-5">
                                <p className="text-xl font-semibold leading-none tracking-tight text-first-muted">
                                    Pracownicy:
                                </p>
                                <div className="flex w-full flex-wrap justify-start gap-5 md:justify-between">
                                    {work.assignedStaff.length > 0 ? (
                                        work.assignedStaff?.map(
                                            (employee: any) => (
                                                <div
                                                    className="flex items-center gap-3"
                                                    key={employee.id}
                                                >
                                                    <div className="relative flex">
                                                        <Avatar className="z-10 ring-1 ring-first-muted ring-offset-2 ring-offset-myBackground">
                                                            <AvatarImage
                                                                src={
                                                                    employee.image
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                <SpinnerCustom />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <Badge className="pointer-events-none absolute -top-2 z-0 translate-x-2/3 select-none bg-indigo-700 px-1.5 py-[0.1px]">
                                                            STAFF
                                                        </Badge>
                                                    </div>
                                                    <span className="mt-1 text-lg font-semibold leading-none tracking-tight text-myText">
                                                        {employee.name}
                                                    </span>
                                                </div>
                                            ),
                                        )
                                    ) : (
                                        <p className="mt-1 text-sm font-semibold leading-none tracking-tight text-myText">
                                            Brak przypisanych pracowników.
                                            <br /> Edytuj pracę aby przypisać
                                            nowych pracowników.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Table>
                        <TableHeader className="w-full">
                            <TableRow>
                                <TableHead className="text-first">
                                    Nazwa materiału
                                </TableHead>
                                <TableHead className="borderColor border-l text-center text-first">
                                    Ilość
                                </TableHead>
                                <TableHead className="borderColor border-l text-center text-first">
                                    Źródło
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materialTable.length <= 0 ? (
                                <TableRow>
                                    <TableCell className="borderColor border-r">
                                        Tutaj pojawią się dodane materiały
                                    </TableCell>
                                    <TableCell className="borderColor border-l text-center">
                                        Tutaj pojawi się ilość
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {materialTable.map((item: any) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="p-0 px-4">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="borderColor border-l text-center">
                                                {item.quantity}
                                                {item.unit}
                                            </TableCell>
                                            <TableCell className="borderColor border-l text-center">
                                                {item.materialId
                                                    ? "Magazyn"
                                                    : "Sklep"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )
        },
    }))
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false)
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [active])

    useOutsideClick(ref, () => setActive(null))

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10 h-full w-full bg-black/40"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 z-[200] grid place-items-center">
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="flex h-full w-full max-w-[700px] flex-col overflow-y-scroll bg-cardBackground sm:rounded-3xl md:h-fit md:max-h-[90%] md:overflow-auto"
                        >
                            <motion.div
                                layoutId={`image-${active.title}-${id}`}
                                className="relative"
                            >
                                <Image
                                    priority
                                    width={200}
                                    height={200}
                                    src={active.src}
                                    alt={active.title}
                                    className="h-80 w-full bg-myBackground object-contain object-center sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                                />
                                <div className="absolute right-0 top-0 z-[200] mr-4 mt-4">
                                    <button
                                        onClick={() => setActive(null)}
                                        className="rounded-full border border-first-muted bg-cardBackground p-px hover:opacity-70"
                                    >
                                        <X
                                            className="h-8 w-8 text-first-muted"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </motion.div>

                            <div className="flex h-full flex-col">
                                <div className="flex items-start justify-between p-4">
                                    <div className="flex-1">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-first-muted"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-myText-muted"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>
                                    <motion.a
                                        layoutId={`button-${active.title}-${id}`}
                                        href={active.ctaLink}
                                        className="rounded-full bg-first-muted px-5 py-2 text-sm font-bold text-myText"
                                    >
                                        Edytuj
                                    </motion.a>
                                </div>
                                <div className="relative flex-1 px-4 pt-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="mb-20 flex h-fit flex-col items-start gap-4 overflow-y-scroll text-xs text-myText md:max-h-72 md:text-sm lg:text-base"
                                    >
                                        {typeof active.content === "function"
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="h-content relative mx-auto min-h-full w-full gap-4 px-4">
                <h2 className="mb-4 flex gap-2 p-4 text-2xl font-extrabold text-myText">
                    Potrzebne materiały
                    <Scroll className="text-first-muted" />
                </h2>
                <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-cardBackground/80"></div>
                <div className="glassPattern3 absolute left-0 top-0 h-full w-full rounded-lg"></div>
                {cards.map((card: any) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className="flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 dark:hover:bg-first/40 md:flex-row"
                    >
                        <div className="flex w-full flex-col gap-2 text-balance md:flex-row">
                            <motion.div layoutId={`image-${card.title}-${id}`}>
                                <Image
                                    width={100}
                                    height={100}
                                    src={card.src}
                                    alt={card.title}
                                    className="mx-auto h-40 w-40 rounded-lg bg-myBackground object-contain object-center md:min-h-8 md:min-w-8"
                                />
                            </motion.div>
                            <div className="">
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="text-center text-lg font-extrabold text-myText md:text-left"
                                >
                                    {card.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${card.description}-${id}`}
                                    className="text-center text-base text-myText-muted md:text-left"
                                >
                                    {card.description}
                                </motion.p>
                            </div>
                        </div>
                        <motion.button
                            layoutId={`button-${card.title}-${id}`}
                            className="borderColor mt-4 rounded-full border bg-cardBackground px-3 py-2 text-sm font-bold text-first-muted hover:border-first-muted hover:text-white md:mt-0"
                        >
                            {card.ctaText}
                        </motion.button>
                    </motion.div>
                ))}
            </ul>
        </>
    )
}
