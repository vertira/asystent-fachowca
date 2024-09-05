/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CwM6bY1FXbO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useState, useEffect, ChangeEvent } from "react"
import Image from "next/image"
import SpinnerSmall from "../ui/spinner-small"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface Suggestion {
    id: string
    address: { label: string }
}
export default function AutocompleteAdd({
    setAddress,
    setUploadedMap,
}: {
    setUploadedMap: any
    setAddress: any
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState<string>("")
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [mapUrl, setMapUrl] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const handleSearch = async () => {
        if (!query) return
        try {
            const response = await fetch(
                `/api/hereAutocomplete?q=${encodeURIComponent(query).replace(
                    /%20/g,
                    "+",
                )}&type=autocomplete`,
            )
            const data = await response.json()
            setSuggestions(data.items || [])
        } catch (error) {
            console.error("Error fetching autocomplete data:", error)
        }
    }
    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        setIsDropdownOpen(value.length > 3)
    }

    const handleSuggestionClick = async (suggestion: Suggestion) => {
        setIsLoading(true)
        setIsDropdownOpen(false)
        setQuery(suggestion.address.label)
        try {
            const response = await fetch(
                `/api/hereAutocomplete?placeId=${suggestion.id}&type=coordinates`,
            )

            if (!response.ok) {
                throw new Error("Failed to fetch coordinates")
            }

            const { lat, lng } = await response.json()

            const mapResponse = await fetch(
                `/api/hereAutocomplete?lat=${lat}&lng=${lng}&type=mapurl`,
            )

            if (!mapResponse.ok) {
                throw new Error("Failed to fetch map URL")
            }

            const mapData = await mapResponse.json()
            setUploadedMap(mapData.mapImageUrl)
            setMapUrl(mapData.mapImageUrl)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (query.length > 3) {
            handleSearch()
        }
        setAddress(query)
    }, [query])
    return (
        <>
            <Label htmlFor="address" className="font-medium">
                Adres budowy
            </Label>
            <div className="flex flex-col">
                <Input
                    type="text"
                    value={query}
                    name="address"
                    onChange={handleInputChange}
                    placeholder="Wyszukaj adres"
                    className="mt-2 w-full rounded-md border p-2 focus:outline-none"
                />
                {isDropdownOpen && suggestions.length > 0 && (
                    <div className="borderColor absolute z-10 mt-1 max-h-60 w-1/2 max-w-xl translate-y-1/4 overflow-y-scroll rounded-md border bg-cardBackground text-first-muted lg:w-full">
                        <ul className="py-1">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    className="cursor-pointer px-4 py-2 hover:text-myText"
                                    onClick={() =>
                                        handleSuggestionClick(suggestion)
                                    }
                                >
                                    {suggestion.address.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {isLoading && <SpinnerSmall />}
                {mapUrl && !isLoading ? (
                    <Image
                        src={mapUrl}
                        alt="Map"
                        width={600}
                        height={400}
                        className="md:max-h-xl mx-auto mt-8 w-full rounded-md border-2 border-first border-neutral-900/30 md:max-w-xl"
                    />
                ) : (
                    ""
                )}
            </div>
        </>
    )
}
