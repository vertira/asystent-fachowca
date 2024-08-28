// app/api/hereAutocomplete/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const q = searchParams.get("q") || "";
	const type = searchParams.get("type") || "";
	const placeId = searchParams.get("placeId") || "";
	const lat = searchParams.get("lat") || "";
	const lng = searchParams.get("lng") || "";

	const apiKey = process.env.AUTOCOMPLETE_KEY;
	const apiKeyGeofiy = process.env.GEOIFY_KEY;
	if (!apiKey || !apiKeyGeofiy) {
		return NextResponse.json(
			{ error: "NEXT_PUBLIC_HERE_API_KEY is not set" },
			{ status: 500 }
		);
	}

	try {
		if (type === "autocomplete") {
			const url = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${encodeURIComponent(
				q
			).replace(/%20/g, "+")}&apiKey=${apiKey}&in=countryCode:POL`;
			const response = await fetch(url);
			const data = await response.json();
			return NextResponse.json(data);
		} else if (type === "coordinates") {
			const url = `https://lookup.search.hereapi.com/v1/lookup?id=${placeId}&apiKey=${apiKey}`;
			const response = await fetch(url);
			const data = await response.json();
			const coordinates = data.position;
			return NextResponse.json(coordinates);
		} else if (type === "mapurl") {
			const url = `https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=600&height=400&center=lonlat:${lng},${lat}&zoom=17&marker=lonlat:${lng},${lat};color:%23ff0000;size:medium&&apiKey=${apiKeyGeofiy}`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(
					`Failed to fetch map image: ${response.status} ${response.statusText}`
				);
			}
			const imageData = await response.arrayBuffer();
			const base64Image = Buffer.from(imageData).toString("base64");
			return NextResponse.json({
				mapImageUrl: `data:image/jpeg;base64,${base64Image}`,
			});
		}
	} catch (error: any) {
		console.error("Error fetching data:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
