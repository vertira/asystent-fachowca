"use client"
import React, { ReactNode, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar-base-component"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import { useMediaQuery } from "react-responsive"
import {
    AvatarSideBar,
    Logo,
    NewWorkSideBar,
    Settings,
    SignOut,
    links,
} from "./custom-routes-links"
export function SideBarMotion({
    children,
    authenticatedUser,
    works,
}: {
    children: ReactNode
    authenticatedUser: any
    works: any
}) {
    let value
    if (typeof window !== "undefined") {
        value = localStorage.getItem("tour") || "true"
    }
    const [open, setOpen] = useState(false)
    const [isTourActive, setIsTourActive] = useState(false)
    const [isFirstLogin, setIsFirstLogin] = useState(value)
    const isSmallDevice = useMediaQuery({ maxWidth: 768 })
    const driverObj = driver({
        onPopoverRender(popover, opts) {
            const glass = document.createElement("div")
            glass.classList.add("popover-background")
            popover.wrapper.appendChild(glass)
        },
        nextBtnText: "Dalej",
        prevBtnText: "Do tyłu",
        doneBtnText: "Koniec",
        popoverClass: "driverjs-theme",
        steps: isSmallDevice
            ? [
                  {
                      element: ".tour-mobile-dashboard",
                      popover: {
                          title: "Dashboard",
                          description:
                              "Główny komponent do szybkiego zarządzania",
                          side: "top",
                          align: "center",
                      },
                  },
                  {
                      element: ".tour-mobile-new-work",
                      popover: {
                          title: "Sekcja dodawania nowej pracy",
                          description:
                              "Dodawanie nowej pracy wraz z szczegółami.",
                          side: "top",
                          align: "center",
                      },
                  },
                  {
                      element: ".tour-mobile-upcoming-works",
                      popover: {
                          title: "Sekcja prac rozdzielonych w czasie",
                          description:
                              "Szybki podgląd aktualnych prac oraz nadchodzących.",
                          side: "top",
                          align: "center",
                      },
                  },
                  {
                      element: ".tour-mobile-warehouse",
                      popover: {
                          title: "Sekcja zarządzania magazynem materiałów",
                          description:
                              "Dodawanie nowych materiałów lub zmiana istniejących.",
                          side: "top",
                          align: "center",
                      },
                  },
                  {
                      element: ".tour-mobile-settings",
                      popover: {
                          title: "Sekcja ustawień",
                          description:
                              "Edycja profilu, dodawanie nowych pracowników oraz przydzialanie uprawnień.",
                          side: "top",
                          align: "center",
                      },
                  },
              ]
            : [
                  {
                      element: ".tour-dashboard",
                      popover: {
                          title: "Dashboard",
                          description:
                              "Główny komponent do szybkiego zarządzania",
                          side: "left",
                          align: "start",
                      },
                  },
                  {
                      element: ".tour-upcoming-works",
                      popover: {
                          title: "Sekcja prac rozdzielonych w czasie",
                          description:
                              "Szybki podgląd aktualnych prac oraz nadchodzących.",
                          side: "right",
                          align: "center",
                      },
                  },
                  {
                      element: ".tour-edit-work",
                      popover: {
                          title: "Sekcja szczegółowego edytowania prac",
                          description:
                              "Szczegółowe edytowanie np. przypisanie materiałów lub pracowników.",
                          side: "right",
                          align: "center",
                      },
                  },
                  {
                      element: ".tour-warehouse",
                      popover: {
                          title: "Sekcja zarządzania magazynem materiałów",
                          description:
                              "Dodawanie nowych materiałów lub zmiana istniejących.",
                          side: "right",
                          align: "center",
                      },
                  },
                  {
                      element: ".tour-new-work",
                      popover: {
                          title: "Sekcja dodawania nowej pracy",
                          description:
                              "Dodawanie nowej pracy wraz z szczegółami.",
                          side: "right",
                          align: "center",
                      },
                  },
                  {
                      element: ".tour-settings",
                      popover: {
                          title: "Sekcja ustawień",
                          description:
                              "Edycja profilu, dodawanie nowych pracowników oraz przydzialanie uprawnień.",
                          side: "right",
                          align: "center",
                      },
                  },
              ],
        onDestroyStarted: () => {
            setIsTourActive(() => false)
            !isSmallDevice ?? setOpen(() => false)
            localStorage.setItem("tour", "false")
            driverObj.destroy()
        },
    })
    useEffect(() => {
        if (isFirstLogin === "true") {
            setOpen(() => true)
            setIsTourActive(true)
            setTimeout(() => {
                driverObj.drive()
            }, 1000)
        } else if (isFirstLogin === "false") {
            !isSmallDevice ?? setOpen(() => false)
            setIsTourActive(false)
        }
    }, [])

    const handleSetOpen = (value: React.SetStateAction<boolean>) => {
        if (!isTourActive) {
            setOpen(value)
        } else setOpen(open)
    }

    return (
        <div
            className={cn(
                "relative flex w-full flex-1 flex-col-reverse md:flex-row",
            )}
        >
            <Sidebar open={open} setOpen={handleSetOpen}>
                <SidebarBody
                    authenticatedUser={authenticatedUser}
                    works={works}
                >
                    <div
                        className={`absolute -z-10 h-full w-full bg-cardBackground/70 ${
                            open ? "rounded-none" : "rounded-r-2xl"
                        } left-0 top-0`}
                    ></div>
                    <div
                        className={`glassPattern4 absolute h-full w-full ${
                            open ? "rounded-none" : "rounded-r-2xl"
                        } left-0 top-0`}
                    ></div>
                    <Logo />
                    <AvatarSideBar authenticatedUser={authenticatedUser} />
                    <div className="mt-20 flex flex-1 flex-col">
                        <div className="flex flex-col">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                        <NewWorkSideBar
                            authenticatedUser={authenticatedUser}
                            works={works}
                        />
                    </div>
                    <div className="borderColor border-t">
                        <Settings />
                        <SignOut />
                    </div>
                </SidebarBody>
            </Sidebar>
            {children}
        </div>
    )
}
