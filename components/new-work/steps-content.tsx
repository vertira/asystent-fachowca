import { cn } from "@nextui-org/theme"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"
import { DateRange } from "react-day-picker"
import { Button } from "../ui/button"
import { PiCalendar } from "react-icons/pi"
import AutocompleteAdd from "./autocomplete-address"
import { ImagesUploader } from "./images-uploader"
import Realistic from "react-canvas-confetti/dist/presets/realistic"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import Image from "next/image"
import { Calendar } from "../ui/calendar"
import { ArrowRight } from "lucide-react"
export const categories = [
    "Parkiet",
    "Płytki",
    "Malowanie",
    "Tynkowanie",
    "Gipsowanie",
    "Elektryka",
    "Hydraulika",
    "Stolarka",
    "Glazura",
    "Ocieplenie",
    "Elewacja",
    "Dekarstwo",
    "Murarstwo",
    "Wyburzenia",
    "Izolacje",
    "Posadzki",
    "Ogrodzenia",
    "Brukarstwo",
    "Sufity",
    "Tapetowanie",
]
export const steps = [
    {
        number: 1,
        title: "Połóż fundament",
        description: "Nazwa projektu",
        content: ({
            name,
            setName,
            slug,
            setSlug,
        }: {
            name: string
            setName: Dispatch<SetStateAction<string>>
            slug: string
            setSlug: Dispatch<SetStateAction<string>>
        }) => (
            <>
                <h1 className="text-3xl font-semibold text-myText lg:text-4xl">
                    Połóż fundament swojego projektu! 🔨
                </h1>
                <p className="mt-4 text-lg font-light leading-8 text-myText-muted lg:text-xl">
                    Każda wielka budowa zaczyna się od nazwy. Jak nazwiesz swoje
                    nowe przedsięwzięcie?
                </p>
                <div className="mt-10 px-2">
                    <Label className="font-medium">Nazwa robocza</Label>
                    <Input
                        type="text"
                        value={name}
                        maxLength={30}
                        className="mt-2 w-full rounded-md border p-2 focus:outline-none"
                        onChange={(e) => {
                            const productName = e.target.value
                            setName(productName.slice(0, 30))
                            setSlug(
                                productName
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                    .replace(/\./g, "-"),
                            )
                        }}
                    />
                    <div className="mt-1 text-sm text-myText-muted">
                        {name.length} / 30
                    </div>
                </div>
                <div className="mt-10 px-2">
                    <Label className="font-medium">
                        Slug (URL) - automatycznie generowana nazwa dla twojej
                        pracy
                    </Label>
                    <Input
                        type="text"
                        value={slug}
                        className="mt-2 w-full rounded-md border p-2 focus:outline-none"
                        readOnly
                    />
                </div>
            </>
        ),
    },
    {
        number: 2,
        title: "Wybierz pole działania",
        description: "Kategorie projektu",
        content: ({
            selectedCategories,
            setSelectedCategories,
        }: {
            selectedCategories: string[]
            setSelectedCategories: Dispatch<SetStateAction<string[]>>
        }) => (
            <>
                <h1 className="text-3xl font-semibold text-myText lg:text-4xl">
                    Wybierz swoje pole działania 🔧
                </h1>
                <p className="mt-4 text-lg font-light leading-8 text-myText-muted lg:text-xl">
                    Każdy projekt ma swój charakter.
                    <br />
                    Jaki typ budowy planujesz?🏗️
                </p>
                <div className="mt-10">
                    <h2 className="font-medium text-first">
                        Wybierz kategorie
                    </h2>
                    <div className="grid grid-cols-3 items-center justify-center gap-2 pt-4 md:grid-cols-4">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                className="borderColor flex rounded-full border"
                                onClick={() => {
                                    if (selectedCategories.includes(category)) {
                                        setSelectedCategories((prev) =>
                                            prev.filter(
                                                (cat) => cat !== category,
                                            ),
                                        )
                                    } else if (selectedCategories.length < 3) {
                                        setSelectedCategories((prev) => [
                                            ...prev,
                                            category,
                                        ])
                                    }
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div
                                    className={`text-md w-full cursor-pointer p-2 text-center md:text-sm ${
                                        selectedCategories.includes(category)
                                            ? "rounded-full bg-gradient-to-b from-[#ff7400] to-[#803a00] text-myText"
                                            : "text-myText-muted"
                                    }`}
                                >
                                    {category}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </>
        ),
    },
    {
        number: 3,
        title: "Wskaż miejsce akcji",
        description: "Adres i opis",
        content: ({
            setAddress,
            contact,
            setContact,
            setUploadedMap,
        }: {
            contact: string
            setAddress: Dispatch<SetStateAction<string>>
            setContact: Dispatch<SetStateAction<string>>
            setUploadedMap: Dispatch<SetStateAction<string>>
        }) => (
            <>
                <h1 className="text-3xl font-extrabold text-myText lg:text-4xl">
                    Wskaż miejsce akcji 📍
                </h1>
                <p className="mt-4 text-lg font-light leading-8 text-myText-muted lg:text-xl">
                    Gdzie rozpoczniesz swoją budowlaną przygodę? Podaj adres i
                    dodaj szczegóły, które pomogą w realizacji projektu.
                </p>
                <div className="mt-10 px-2">
                    <div>
                        <Label className="">Telefon inwestora</Label>
                        <span className="ml-2 text-[10px] text-green-500">
                            (opcjonalnie)
                        </span>
                        <Input
                            type="tel"
                            value={contact}
                            name="phone"
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Nr telefonu..."
                            className="my-2 w-full rounded-md border p-2 focus:outline-none"
                        />
                    </div>
                    <AutocompleteAdd
                        setUploadedMap={setUploadedMap}
                        setAddress={(value: string) => setAddress(value)}
                    />
                </div>
            </>
        ),
    },
    {
        number: 4,
        title: "Uwiecznij metamorfozę",
        description: "Dodaj zdjęcia",
        content: ({
            uploadedWorkImages,
            setUploadedWorkImages,
        }: {
            uploadedWorkImages: string[]
            setUploadedWorkImages: Dispatch<SetStateAction<string[]>>
        }) => (
            <>
                <h1 className="relative text-3xl font-semibold text-myText lg:text-4xl">
                    Uwiecznij metamorfozę! 📸
                    <span className="absolute -top-5 left-0 text-xs text-green-500">
                        (opcjonalnie)
                    </span>
                </h1>
                <p className="mt-4 text-lg font-light leading-8 text-myText-muted lg:text-xl">
                    Zdjęcia mówią więcej niż tysiąc słów! Dodaj fotografie
                    obecnego stanu miejsca prac, aby lepiej zobrazować planowane
                    zmiany. Nie martw się, jeśli nie masz ich teraz pod ręką -
                    możesz je dodać później.
                </p>
                <div className="mt-4">
                    <div className="font-medium text-first">Dodaj zdjęcia</div>
                    <div className="mt-2 gap-2 space-y-4 md:flex md:space-y-0">
                        {uploadedWorkImages?.map((url, index) => (
                            <div
                                key={index}
                                className="relative mx-auto h-40 w-1/2 max-w-xl md:mx-0 md:w-40"
                            >
                                <Image
                                    priority
                                    src={url}
                                    alt="Zdjecia pracy"
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-md border border-first"
                                />
                            </div>
                        ))}
                    </div>
                    <ImagesUploader
                        endpoint="workImages"
                        onChange={(urls) => setUploadedWorkImages(urls)}
                    />
                </div>
            </>
        ),
    },
    {
        number: 5,
        title: "Zaplanuj kalendarz",
        description: "Wybierz daty",
        content: ({
            date,
            setDate,
            works,
        }: {
            date: DateRange | undefined
            setDate: Dispatch<SetStateAction<DateRange | undefined>>
            works: any
        }) => (
            <>
                <h1 className="text-3xl font-semibold text-myText lg:text-4xl">
                    Stwórz budowlany kalendarz🗓️
                </h1>
                <p className="mt-4 text-lg font-light leading-8 text-myText-muted lg:text-xl">
                    Każdy projekt ma swój początek i koniec.
                    <br /> Wybierz daty, które wyznaczą ramy czasowe Twojego
                    przedsięwzięcia.
                </p>
                <div className="flex-1 pt-10">
                    <div className="pb-3 font-medium text-first">
                        Wybierz datę OD-DO
                    </div>

                    <Button
                        variant={"ghostsecond"}
                        className={cn(
                            "pointer-events-none w-[300px] pl-3 text-left font-normal",
                            !date && "text-muted-foreground",
                        )}
                    >
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y", {
                                        locale: pl,
                                    }).toString()}{" "}
                                    -{" "}
                                    {format(date.to, "LLL dd, y", {
                                        locale: pl,
                                    }).toString()}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y", {
                                    locale: pl,
                                })
                            )
                        ) : (
                            <span>Wybierz datę</span>
                        )}
                        <PiCalendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                    <div className="mb-px mt-10 flex gap-2 text-xs md:text-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span>Data dzisiejsza</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span>Data zajęta</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                            <span>Data zaznaczona</span>
                        </div>
                    </div>
                    <Calendar
                        className="w-full rounded-md bg-cardBackground/90"
                        locale={pl}
                        initialFocus
                        mode="range"
                        works={works}
                        fromDate={new Date()}
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                </div>
            </>
        ),
    },
    // {
    // 	number: 6,
    // 	title: "Skompletuj koszyk",
    // 	description: "Wybierz materiały",
    // 	content: () => (
    // 		<>
    // 			<h1 className="text-3xl lg:text-4xl font-semibold text-first-muted">
    // 				Skompletuj swój budowlany koszyk 🧰🏗️
    // 			</h1>
    // 			<p className="text-lg lg:text-xl font-light mt-4 leading-8 text-myText-muted">
    // 				Tutaj zaczyna się magia Twojego projektu! Wybierz materiały ze swojego
    // 				magazynu lub dodaj nowe pozycje do listy. Pamiętaj, dobry budowniczy
    // 				to przygotowany budowniczy!
    // 			</p>
    // 			<div className="mt-10">
    // 				<MaterialAssign />
    // 			</div>
    // 		</>
    // 	),
    // },
    {
        number: 6,
        title: "Podsumowanie",
        description: "Przejrzyj i wyślij",
        content: ({
            name,
            slug,
            selectedCategories,
            address,
            contact,
            uploadedWorkImages,
            date,
        }: {
            name: string
            slug: string
            selectedCategories: string[]
            address: string
            contact: string
            uploadedWorkImages: string[]
            date: DateRange | undefined
        }) => (
            <>
                <h1 className="py-2 text-3xl font-extrabold text-myText lg:text-4xl">
                    Sprawdź szczegóły projektu 🔍
                </h1>
                <p className="mt-4 text-lg font-light leading-8 lg:text-xl">
                    Upewnij się, że wprowadzone przez Ciebie informacje są
                    prawidłowe. Nie martw się – wszystkie wprowadzone dane
                    będziesz mógł modyfikować w miarę rozwoju prac.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                        <div className="font-semibold text-first-muted">
                            Nazwa projektu
                        </div>
                        <div className="mt-2 text-myText-muted">{name}</div>
                    </div>
                    <div>
                        <div className="font-semibold text-first-muted">
                            Slug (URL)
                        </div>
                        <div className="mt-2 text-myText-muted">{slug}</div>
                    </div>
                    <div>
                        <div className="font-semibold text-first-muted">
                            Kategorie
                        </div>
                        <div className="mt-2 text-myText-muted">
                            {selectedCategories.join(", ")}
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-first-muted">
                            Adres
                        </div>
                        <div className="mt-2 text-myText-muted">{address}</div>
                    </div>
                    <div className="">
                        <div className="font-semibold text-first-muted">
                            Telefon
                            <sup className="ml-1 text-[8px] text-green-500">
                                (opcjonalnie)
                            </sup>
                        </div>
                        <div className="mt-2 text-first">
                            {contact ? (
                                contact
                            ) : (
                                <span className="text-myText">-</span>
                            )}
                        </div>
                    </div>
                    <div className="">
                        <div className="font-semibold text-first-muted">
                            Zakres dat
                        </div>
                        <div className="mt-2 text-myText-muted">
                            {date?.from && date?.to
                                ? `${format(date.from, "dd.MM.yyyy")} - ${format(
                                      date.to,
                                      "dd.MM.yyyy",
                                  )}`
                                : "Nie wybrano dat"}
                        </div>
                    </div>
                    <div className="">
                        <div className="font-semibold text-first-muted">
                            Zdjęcia pracy{" "}
                            <sup className="text-[8px] text-green-500">
                                (opcjonalnie)
                            </sup>
                        </div>
                        <div className="mt-2 w-full gap-2 md:flex">
                            {uploadedWorkImages.map((url, index) => (
                                <div key={index} className="relative h-28 w-28">
                                    <Image
                                        priority
                                        src={url}
                                        alt="Uploaded Project Image"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        ),
    },
    {
        number: 7,
        title: "",
        description: "",
        content: ({
            router,
            setActiveStep,
            workId,
        }: {
            router: any
            setActiveStep: Dispatch<SetStateAction<number>>
            workId: string
        }) => (
            <>
                <div className="my-auto text-center">
                    <h1 className="mb-10 text-5xl font-semibold text-first-muted lg:text-4xl">
                        Nowy projekt na pokładzie! 🧰🏗️
                    </h1>
                    <p className="mt-4 text-lg font-light leading-8 text-myText-muted lg:text-xl">
                        Gratulacje!
                        <br /> Twój projekt został pomyślnie dodany!
                    </p>
                    <Realistic autorun={{ speed: 0.1, duration: 1000 }} />
                    <div className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row">
                        <div className="text-2xl">Co chcesz zrobić teraz?</div>
                        <div className="flex flex-col gap-4">
                            <div className="group flex items-center gap-4">
                                <ArrowRight className="text-first-muted md:text-first-muted md:group-hover:text-first-muted" />
                                <Button
                                    variant="ghostsecond"
                                    className="w-full"
                                    onClick={() => router.push("/")}
                                >
                                    Przejdź do strony głównej
                                </Button>
                            </div>
                            <div className="group flex items-center gap-4">
                                <ArrowRight className="text-first-muted md:text-first-muted md:group-hover:text-first-muted" />
                                <Button
                                    variant="ghostsecond"
                                    className="w-full"
                                    onClick={() => setActiveStep(1)}
                                >
                                    Dodaj kolejną pracę
                                </Button>
                            </div>
                            <div className="group flex items-center gap-4">
                                <ArrowRight className="text-first-muted md:text-first-muted md:group-hover:text-first-muted" />
                                <Button
                                    variant="ghostsecond"
                                    className="w-full"
                                    onClick={() =>
                                        router.push(`/edit/${workId}`)
                                    }
                                >
                                    Dodaj materiały do pracy
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ),
    },
]
