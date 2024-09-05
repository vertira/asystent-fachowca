import Link from "next/link"
import { Comments } from "./comments"
import { Meteorss } from "./meteors-card"
import ShimmerButton from "./shimmer-button"
import { TypewriterEffectSmooths } from "./typewriterEffectSmooth"
import { WobbleCardShow } from "./wobble"
import Image from "next/image"
import { TypewriterEffectSection2 } from "./typewriterEffectSection2"

export default function LandingPage() {
    return (
        <>
            <section className="h-content w-full px-8">
                <div className="flex w-full flex-col items-center pb-10">
                    <div className="flex h-full flex-col items-start justify-center">
                        <div className="z-10 flex w-full flex-col pt-4">
                            <div className="z-10 mt-6 flex w-full items-center justify-center">
                                <Image
                                    src="/logo/small-logo.png"
                                    width={100}
                                    height={100}
                                    alt={"logo"}
                                    className="mb-3 mr-4 h-14 w-14 sm:h-20 sm:w-20"
                                />
                                <h1 className="text-left text-2xl font-bold text-myText sm:text-3xl md:text-4xl xl:text-7xl">
                                    Asystent Fachowca
                                </h1>
                            </div>

                            <div className="mx-auto mt-5 min-h-32 w-4/5 text-center">
                                <span className="text-sm text-myText-muted sm:text-xl">
                                    Twoje centrum dowodzenia dla każdego
                                    projektu budowlanego - od planowania po
                                    ostatni gwóźdź.
                                </span>
                                <TypewriterEffectSmooths />
                            </div>
                            <div className="mb-4 mt-6 flex w-full flex-col justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
                                <ShimmerButton className="mx-auto flex justify-center">
                                    <span className="z-10 w-48 whitespace-pre text-center text-sm font-semibold leading-none tracking-tight text-myText">
                                        Wypróbuj demo aplikacji!
                                    </span>
                                </ShimmerButton>
                            </div>
                        </div>
                    </div>

                    <div className="h-full w-full">
                        <div className="flex items-center justify-center">
                            <Meteorss />
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative h-fit w-full px-8 xl:h-screen">
                <div className="flex h-full w-full flex-col justify-center">
                    <div className="mb-5 flex w-full flex-col items-center justify-center">
                        <TypewriterEffectSection2 />
                        <WobbleCardShow />
                    </div>
                </div>
            </section>
            <section className="w-full px-8 pt-10 sm:px-0 sm:pt-0 md:px-0 md:pt-0 xl:px-0 xl:pt-0">
                <div className="flex h-screen w-full flex-col items-center pb-[100px] pt-10">
                    <div>
                        <h1 className="relative z-10 mb-6 text-center text-3xl font-bold text-myText md:text-5xl">
                            Kategorie prac
                        </h1>
                    </div>
                    <div className="-zinc-100 z-10 mb-6 text-center text-xl text-myText-muted md:text-xl">
                        Niezależnie od typu prac, mamy dla Ciebie odpowiednią
                        kategorię. Znajdziesz tu wszystko, czego potrzebujesz do{" "}
                        <span className="font-bold text-first-muted">
                            efektywnego
                        </span>{" "}
                        zarządzania swoim projektem budowlanym.
                    </div>
                    <div className="w-screen flex-1 overflow-x-hidden">
                        <Comments />
                    </div>
                </div>
            </section>
        </>
    )
}
