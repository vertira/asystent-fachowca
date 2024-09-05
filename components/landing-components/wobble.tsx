"use client"

import React from "react"

import { WobbleCard } from "./wobble-card"
import Image from "next/image"
export function WobbleCardShow() {
    return (
        <div className="mx-auto grid w-4/5 max-w-7xl grid-cols-1 gap-4 lg:w-full lg:grid-cols-3">
            <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-first-muted/60 min-h-[400px] xl:min-h-[300px]">
                <div className="flex w-full flex-col justify-center">
                    <h2 className="text-balance text-center text-xl font-semibold tracking-[-0.015em] text-myText md:text-xl lg:text-left lg:text-3xl">
                        Nie zapominaj o pracach
                    </h2>
                    <p className="my-4 w-full text-center text-base/6 text-myText lg:max-w-xs lg:text-left">
                        Nasza aplikacja to Twój niezawodny asystent budowlany.
                        Przypomina o zaplanowanych zadaniach, terminach dostaw i
                        kluczowych etapach projektu.
                    </p>
                </div>
                <Image
                    src="/images/plans.webp"
                    width={500}
                    height={500}
                    alt="linear demo"
                    className="absolute right-0 w-full object-contain lg:-right-[35%] lg:bottom-0 lg:max-w-md xl:-right-[25%]"
                />
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 bg-indigo-600/60 min-h-[200px]">
                <h2 className="text-balance text-center text-xl font-semibold tracking-[-0.015em] text-myText md:text-xl lg:text-left lg:text-3xl">
                    Zarządzaj pracami z każdego miejsca
                </h2>
                <p className="my-4 w-full text-center text-base/6 text-myText lg:max-w-xs lg:text-left">
                    Pełna kontrola nad projektem na smartfonie, tablecie czy
                    komputerze. Wszystko w zasięgu ręki, gdziekolwiek jesteś.
                </p>
            </WobbleCard>
            <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900/60 min-h-[500px]  lg:min-h-[300px]">
                <div className="flex w-full flex-col justify-center">
                    <h2 className="text-balance text-center text-xl font-semibold tracking-[-0.015em] text-myText md:text-xl lg:text-left lg:text-3xl">
                        Dokumentuj postępy za pomocą zdjęć
                    </h2>
                    <p className="my-4 w-full text-center text-base/6 text-myText lg:max-w-xs lg:text-left">
                        Dodawaj zdjęcia przed, w trakcie i po pracach. Śledź
                        wizualnie postęp projektu, dziel się efektami z
                        klientami i zespołem. Twoja budowa w kadrze, zawsze pod
                        ręką.
                    </p>
                </div>
                <Image
                    src="/images/parquet.webp"
                    width={500}
                    height={500}
                    alt="linear demo"
                    className="absolute right-0 w-full object-contain lg:-right-[5%] lg:bottom-0 lg:max-w-md xl:-right-[0%]"
                />
            </WobbleCard>
        </div>
    )
}
