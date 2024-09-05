import { cn } from "@/lib/utils";
import Marquee from "./marquee";

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
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ category }: { category: string }) => {
  return (
    <figure
      className={cn(
        "relative aspect-video md:h-full h-3/4 bg-cardBackground/60 flex items-center cursor-pointer overflow-hidden rounded-xl border p-4 odd:text-first-muted text-center",
        // light styles
        "borderColor  hover:bg-cardBackground",
      )}
    >
      <blockquote className="mx-auto text-nowrap max-w-fit text-4xl md:text-7xl font-bold">
        {category}
      </blockquote>
    </figure>
  );
};

const Comments = () => {
  return (
    <div className="relative flex h-full w-full gap-20 flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent 0">
      <Marquee pauseOnHover className="[--duration:20s] grow">
        {firstRow.map((review) => (
          <ReviewCard key={review.category} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] grow">
        {secondRow.map((review) => (
          <ReviewCard key={review.category} {...review} />
        ))}
      </Marquee>
      <div className="absolute inset-y-0 left-0 w-1/3  "></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3  "></div>
    </div>
  );
};

export { Comments };
