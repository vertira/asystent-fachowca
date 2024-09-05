"use client"
import React from "react"
import { CalendarDashboard } from "./calendar"
import { AddMessage } from "./add-message"
import Messages from "./messages"
import { ShopingList } from "./shoping-list"
import { Calendar } from "lucide-react"
interface Dashboard {
    authenticatedUser: any
    materials: any
    works: any
    userPermissions: any
}
const Dashboard: React.FC<Dashboard> = ({
    authenticatedUser,
    userPermissions,
    materials,
    works,
}) => {
    return (
        <div className="min-h-screen w-full bg-transparent px-6 pt-6 xl:px-0">
            <div className="mb-6 flex items-center justify-start">
                <h1 className="h-fit text-4xl font-extrabold text-myText">
                    Witaj, {authenticatedUser.user.name} !
                </h1>
            </div>
            <div className="tour-dashboard grid grid-rows-1 gap-6 xl:max-h-[calc(100vh-100px)] xl:grid-cols-3">
                <div className="glassCard col-span-2 flex flex-col rounded-lg p-4 shadow xl:col-span-2">
                    <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-cardBackground/30"></div>
                    <div className="glassPattern3 absolute left-0 top-0 h-full w-full rounded-lg"></div>
                    <h2 className="mb-4 flex gap-2 text-2xl font-extrabold text-myText">
                        Kalendarz prac
                        <Calendar className="text-first-muted" />
                    </h2>
                    <div className="z-20 flex w-full flex-1 xl:overflow-y-scroll">
                        {userPermissions.role === "EMPLOYER" ? (
                            <CalendarDashboard />
                        ) : userPermissions.permissions.calendar ? (
                            <CalendarDashboard />
                        ) : (
                            "Nie masz uprawnień aby wyświetlić ten element"
                        )}
                    </div>
                </div>
                <div className="glassCard col-span-2 flex max-h-[50vh] flex-col overflow-hidden rounded-lg p-4 shadow xl:col-span-1 xl:row-span-1 xl:max-h-full">
                    <div className="glassBackground absolute left-0 top-0 -z-20 h-full w-full rounded-lg"></div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">
                            Ważne wiadomości
                        </h2>
                        <AddMessage authenticatedUser={authenticatedUser} />
                    </div>
                    <Messages />
                </div>
                <div className="relative col-span-2 rounded-lg bg-cardBackground/90 p-4 shadow xl:col-span-1 xl:h-[40vh]">
                    <div className="glassPattern absolute left-0 top-0 h-full w-full rounded-lg"></div>
                    <h2 className="mb-4 text-2xl font-bold text-first">
                        Ostatnio dodane materiały
                    </h2>
                    <ul className="py-4">
                        {userPermissions.role === "EMPLOYER"
                            ? materials.map((material: any) => (
                                  <li
                                      key={material.id}
                                      className="flex items-center justify-between border-b border-white/50 py-2"
                                  >
                                      <span>{material.name}</span>
                                      <span className="text-myText-muted">
                                          {material.quantity} {material.unit}
                                      </span>
                                  </li>
                              ))
                            : userPermissions.permissions.warehouse
                              ? materials.map((material: any) => (
                                    <li
                                        key={material.id}
                                        className="flex items-center justify-between border-b border-white/50 py-2"
                                    >
                                        <span>{material.name}</span>
                                        <span className="text-myText-muted">
                                            {material.quantity} {material.unit}
                                        </span>
                                    </li>
                                ))
                              : "Nie masz uprawnień aby wyświetlić ten element"}
                    </ul>
                </div>
                <div className="relative col-span-2 mb-10 max-h-[70vh] overflow-y-scroll rounded-lg bg-cardBackground/50 xl:h-[40vh]">
                    <ShopingList works={works} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
