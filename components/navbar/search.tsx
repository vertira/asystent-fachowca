"use client"

import { searchWorks } from "@/lib/server-actions"
import { cn } from "@/lib/utils"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FaBriefcase } from "react-icons/fa"
import { PiMagnifyingGlass } from "react-icons/pi"

interface Work {
    id: string
    name: string
    slug: string
    address: string
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
    userId: string
    status: string
}

const Search = () => {
    const [query, setQuery] = useState("")
    const [isClicked, setIsClicked] = useState(false)
    const [searchResults, setSearchResults] = useState<Work[]>([])
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter()
    const handleClick = () => {
        setIsClicked((prevState) => !prevState)
    }
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        setQuery(inputValue)
        if (inputValue.trim() !== "") {
            const works: Work[] = await searchWorks(inputValue)
            const activeProducts = works.filter(
                (product) => product.status === "ACTIVE",
            )
            setSearchResults(activeProducts)
            setIsDropdownVisible(true)
        } else {
            setSearchResults([])
            setIsDropdownVisible(false)
        }
    }

    const handleItemClick = (slug: string, productName: string) => {
        setQuery(productName)
        setIsDropdownVisible(false)
        router.push(`/product/${slug}`)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target as Node)
            ) {
                setIsDropdownVisible(false)
                setQuery("")
                if (isClicked) {
                    setIsClicked(false)
                }
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [isClicked])

    return (
        <div
            className={cn(
                "relative mx-4 flex items-center rounded-full bg-cardBackground text-myText",
                { "w-full": isClicked },
            )}
        >
            <PiMagnifyingGlass
                className={cn("m-2 cursor-pointer")}
                onClick={handleClick}
            />
            <input
                type="text"
                placeholder="Szukaj..."
                className={cn(
                    "w-0 rounded-full bg-cardBackground text-xs outline-none transition-all duration-100 focus:outline-none",
                    { "w-full p-2": isClicked },
                )}
                value={query}
                onChange={handleSearch}
                ref={searchInputRef}
            />

            {isDropdownVisible && searchResults.length > 0 && (
                <ul className="borderColor absolute top-full z-50 mt-2 w-full rounded-md border bg-cardBackground">
                    {searchResults.map((product) => (
                        <li
                            key={product.id}
                            className="flex cursor-pointer items-center gap-x-2 p-2 text-sm hover:bg-first-muted hover:text-black"
                            onClick={() =>
                                handleItemClick(product.slug, product.name)
                            }
                        >
                            <FaBriefcase />
                            {product.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Search
