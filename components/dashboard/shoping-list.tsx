"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Scroll, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SpinnerCustom from "../ui/spinner-custom";
import { Badge } from "../ui/badge";

export function ShopingList({ works }: { works: any }) {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const cards = works.map((work: any) => ({
    description: work.address,
    title: work.name,
    src:
      work.images.length > 0 ? work.images[0].url : "/icons/icon-192x192.png",
    ctaText: "Podgląd",
    ctaLink: `/edit/${work.id}`,
    content: () => {
      const materialsFromShop = work.ShoppingList;
      const materialsFromWarehouse = work.warehouseList;
      const materialTable = [...materialsFromShop, ...materialsFromWarehouse];
      return (
        <div className="h-full w-full">
          <Card className="bg-cardBackground borderColor lg:col-span-2 flex items-center ">
            <CardContent className="flex flex-col lg:flex-row items-center w-full justify-start gap-5 px-6 py-3">
              <div className="flex flex-row w-full items-center justify-center gap-5">
                <p className="text-first-muted  text-xl  font-semibold leading-none tracking-tight">
                  Pracownicy:
                </p>
                <div className="flex flex-wrap md:justify-between justify-start gap-5 w-full">
                  {work.assignedStaff.length > 0 ? (
                    work.assignedStaff?.map((employee: any) => (
                      <div
                        className="flex items-center gap-3"
                        key={employee.id}
                      >
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
                        <span className="text-myText text-lg mt-1 font-semibold leading-none tracking-tight">
                          {employee.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-myText text-sm mt-1 font-semibold leading-none tracking-tight">
                      Brak przypisanych pracowników.
                      <br /> Edytuj pracę aby przypisać nowych pracowników.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Table>
            <TableHeader className="w-full">
              <TableRow>
                <TableHead className="text-first">Nazwa materiału</TableHead>
                <TableHead className="text-center text-first border-l borderColor">
                  Ilość
                </TableHead>
                <TableHead className="text-center text-first border-l borderColor">
                  Źródło
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialTable.length <= 0 ? (
                <TableRow>
                  <TableCell className="border-r borderColor">
                    Tutaj pojawią się dodane materiały
                  </TableCell>
                  <TableCell className="text-center border-l borderColor">
                    Tutaj pojawi się ilość
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {materialTable.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="p-0 px-4">{item.name}</TableCell>
                      <TableCell className="text-center border-l borderColor">
                        {item.quantity}
                        {item.unit}
                      </TableCell>
                      <TableCell className="text-center border-l borderColor">
                        {item.materialId ? "Magazyn" : "Sklep"}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      );
    },
  }));
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[200]">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[700px]  h-full md:h-fit md:max-h-[90%]  flex flex-col  bg-cardBackground sm:rounded-3xl overflow-y-scroll md:overflow-auto"
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
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-contain object-center bg-myBackground"
                />
                <div className="absolute top-0 right-0 mt-4 mr-4 z-[200]">
                  <button
                    onClick={() => setActive(null)}
                    className="hover:opacity-70 border border-first-muted rounded-full p-px bg-cardBackground"
                  >
                    <X
                      className="w-8 h-8 text-first-muted"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.div>

              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start p-4">
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
                    className="px-5 py-2 text-sm rounded-full font-bold bg-first-muted text-myText"
                  >
                    Edytuj
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4 flex-1 ">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-myText text-xs md:text-sm lg:text-base h-fit md:max-h-72 mb-20 flex flex-col items-start gap-4 overflow-y-scroll"
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
      <ul className="mx-auto w-full h-content min-h-full gap-4 relative px-4">
        <h2 className="text-2xl font-extrabold mb-4 text-myText flex gap-2 p-4">
          Potrzebne materiały
          <Scroll className="text-first-muted" />
        </h2>
        <div className="w-full h-full bg-cardBackground/80 -z-10 absolute rounded-lg top-0 left-0"></div>
        <div className="glassPattern3 w-full h-full absolute rounded-lg top-0 left-0"></div>
        {cards.map((card: any) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center  dark:hover:bg-first/40 rounded-xl cursor-pointer "
          >
            <div className="flex gap-2 flex-col md:flex-row text-balance w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:min-h-8 md:min-w-8  mx-auto rounded-lg object-contain object-center bg-myBackground"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-extrabold text-myText text-center md:text-left text-lg"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-myText-muted text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-3 py-2 text-sm rounded-full font-bold bg-cardBackground border borderColor hover:border-first-muted hover:text-white text-first-muted mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}
