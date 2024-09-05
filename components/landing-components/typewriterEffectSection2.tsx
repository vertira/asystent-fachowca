"use client"

import { TextGenerateEffect } from "./typewriter-effect"

export function TypewriterEffectSection2() {
    const words = [
        {
            text: "Zacznij",
            className: "text-myText",
        },
        {
            text: "teraz",
            className: "text-first-muted",
        },
        {
            text: "i",
            className: "text-myText",
        },
        {
            text: "korzystaj",
            className: "text-myText",
        },
        {
            text: "za",
            className: "text-myText",
        },
        {
            text: "darmo",
            className: "text-first-muted",
        },
        {
            text: "!",
            className: "text-myText",
        },
    ]
    return (
        <div className="mx-auto w-full text-nowrap py-5 text-center text-xl font-extrabold leading-normal sm:text-2xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:text-7xl">
            <TextGenerateEffect words={words} />
        </div>
    )
}
