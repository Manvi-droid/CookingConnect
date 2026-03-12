import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const cuisine = searchParams.get("cuisine") || "restaurant";
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

    if (!lat || !lng) {
        return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
    }

    if (!apiKey) {
        return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 });
    }

    try {
        const keyword = `${cuisine} restaurant`;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&keyword=${encodeURIComponent(keyword)}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            console.error("Places API error:", data.status, data.error_message);
            return NextResponse.json({ error: data.error_message || data.status }, { status: 500 });
        }

        const restaurants = (data.results || []).slice(0, 10).map((place: any) => ({
            id: place.place_id,
            name: place.name,
            rating: place.rating || 0,
            totalRatings: place.user_ratings_total || 0,
            address: place.vicinity || "",
            lat: place.geometry?.location?.lat,
            lng: place.geometry?.location?.lng,
            photo: place.photos?.[0]
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
                : null,
            openNow: place.opening_hours?.open_now ?? null,
            priceLevel: place.price_level ?? null,
        }));

        return NextResponse.json({ restaurants });
    } catch (err: any) {
        console.error("Nearby API error:", err);
        return NextResponse.json({ error: "Failed to fetch nearby restaurants" }, { status: 500 });
    }
}
