import React from "react"
interface HeadingText {
    text: string
}
function HeadingHomepage({ text }: HeadingText) {
    return (
        <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="relative z-20 text-center text-3xl font-extrabold tracking-tight text-first-muted md:text-4xl lg:text-4xl">
                {text}
            </h1>
            <div className="relative flex h-2 w-full justify-center">
                <div className="absolute top-0 mx-auto h-[2px] w-1/4 bg-gradient-to-r from-transparent via-orange-600 to-transparent blur-sm" />
                <div className="absolute top-0 mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
                <div className="absolute top-0 mx-auto h-[2px] w-1/2 bg-gradient-to-r from-transparent via-orange-600 to-transparent blur-sm" />
                <div className="absolute top-0 mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-orange-600 to-transparent" />
            </div>
        </div>
    )
}

export default HeadingHomepage
