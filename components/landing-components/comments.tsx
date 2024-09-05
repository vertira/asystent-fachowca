import { cn } from "@/lib/utils"
import Marquee from "./marquee"

const reviews = [
    { category: "Parkiet" },
    { category: "Płytki" },
    { category: "Malowanie" },
    { category: "Tynkowanie" },
    { category: "Gipsowanie" },
    { category: "Elektryka" },
    { category: "Hydraulika" },
    { category: "Stolarka" },
    { category: "Glazura" },
    { category: "Ocieplenie" },
    { category: "Elewacja" },
    { category: "Dekarstwo" },
    { category: "Murarstwo" },
    { category: "Wyburzenia" },
    { category: "Izolacje" },
    { category: "Posadzki" },
    { category: "Ogrodzenia" },
    { category: "Brukarstwo" },
    { category: "Sufity" },
    { category: "Tapetowanie" },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({ category }: { category: string }) => {
    return (
        <figure
            className={cn(
                "relative flex aspect-video h-3/4 cursor-pointer items-center overflow-hidden rounded-xl border bg-cardBackground/60 p-4 text-center odd:text-first-muted md:h-full",
                // light styles
                "borderColor hover:bg-cardBackground",
            )}
        >
            <blockquote className="mx-auto max-w-fit text-nowrap text-4xl font-bold md:text-7xl">
                {category}
            </blockquote>
        </figure>
    )
}

const Comments = () => {
    return (
        <div className="0 relative flex h-full w-full flex-col items-center justify-center gap-20 overflow-hidden rounded-lg bg-transparent">
            <Marquee pauseOnHover className="grow [--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.category} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="grow [--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.category} {...review} />
                ))}
            </Marquee>
            <div className="absolute inset-y-0 left-0 w-1/3"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3"></div>
        </div>
    )
}

export { Comments }
