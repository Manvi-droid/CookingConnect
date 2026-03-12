"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";

interface Restaurant {
    id: string;
    name: string;
    rating: number;
    totalRatings: number;
    address: string;
    lat: number;
    lng: number;
    photo: string | null;
    openNow: boolean | null;
    priceLevel: number | null;
}

interface NearbyMapPanelProps {
    cuisine: string;
    dishName: string;
    onClose: () => void;
}

const mapContainerStyle = {
    width: "100%",
    height: "280px",
    borderRadius: "12px",
};

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
};

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): string {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d < 1 ? `${Math.round(d * 1000)}m` : `${d.toFixed(1)}km`;
}

function StarRating({ rating }: { rating: number }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) stars.push("★");
        else if (i - 0.5 <= rating) stars.push("½");
        else stars.push("☆");
    }
    return (
        <span className="nearby-stars">
            {stars.map((s, i) => (
                <span key={i} className={s === "☆" ? "star-empty" : "star-filled"}>
                    {s === "½" ? "★" : s}
                </span>
            ))}
        </span>
    );
}

export function NearbyMapPanel({ cuisine, dishName, onClose }: NearbyMapPanelProps) {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
    const [locationState, setLocationState] = useState<"requesting" | "granted" | "denied">("requesting");

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
    });

    // Request geolocation
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLocationState("denied");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocationState("granted");
            },
            (err) => {
                console.error("Geolocation error:", err.message || err, err.code);
                let errorMsg = err.message || "Unable to retrieve location.";
                if (err.code === 1) {
                    errorMsg = "Location access denied. Please enable location in your browser settings.";
                } else if (err.code === 2) {
                    errorMsg = "Location unavailable. Please check your device's network connection.";
                } else if (err.code === 3) {
                    errorMsg = "Location request timed out. Please try again.";
                }

                setError(`Location error: ${errorMsg}`);
                setLocationState("denied");
                setLoading(false);
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
        );
    }, []);

    // Fetch restaurants when we have location
    useEffect(() => {
        if (!userLocation) return;

        const fetchRestaurants = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&cuisine=${encodeURIComponent(cuisine)}`
                );
                const data = await res.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setRestaurants(data.restaurants || []);
                }
            } catch (err) {
                setError("Failed to fetch nearby restaurants");
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [userLocation, cuisine]);

    const onMapLoad = useCallback((map: google.maps.Map) => {
        if (restaurants.length > 0 && userLocation) {
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(userLocation);
            restaurants.forEach((r) => bounds.extend({ lat: r.lat, lng: r.lng }));
            map.fitBounds(bounds, 50);
        }
    }, [restaurants, userLocation]);

    const swiggyUrl = `https://www.swiggy.com/search?query=${encodeURIComponent(dishName)}`;
    const zomatoUrl = `https://www.zomato.com/search?q=${encodeURIComponent(dishName)}`;

    return (
        <div className="nearby-panel" onClick={(e) => e.stopPropagation()}>
            <div className="nearby-header">
                <div>
                    <h3>📍 Nearby Restaurants</h3>
                    <p>{cuisine} cuisine near you</p>
                </div>
                <button className="nearby-close-btn" onClick={onClose}>✕</button>
            </div>

            {/* Quick order links */}
            <div className="nearby-quick-links">
                <a href={swiggyUrl} target="_blank" rel="noopener noreferrer" className="quick-link-btn swiggy-btn">
                    <span className="ql-icon">🟠</span> Order on Swiggy
                </a>
                <a href={zomatoUrl} target="_blank" rel="noopener noreferrer" className="quick-link-btn zomato-btn">
                    <span className="ql-icon">🔴</span> Order on Zomato
                </a>
            </div>

            {/* Location requesting state */}
            {locationState === "requesting" && (
                <div className="nearby-status">
                    <div className="nearby-spinner"></div>
                    <p>Requesting your location...</p>
                    <p className="nearby-status-sub">Please allow location access in your browser</p>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="nearby-error">
                    <span>⚠️</span>
                    <p>{error}</p>
                </div>
            )}

            {/* Loading restaurants */}
            {locationState === "granted" && loading && (
                <div className="nearby-status">
                    <div className="nearby-spinner"></div>
                    <p>Finding {cuisine} restaurants near you...</p>
                </div>
            )}

            {/* Map + Results */}
            {locationState === "granted" && !loading && !error && isLoaded && userLocation && (
                <>
                    <div className="nearby-map-wrap">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={userLocation}
                            zoom={13}
                            options={mapOptions}
                            onLoad={onMapLoad}
                        >
                            {/* User location marker */}
                            <MarkerF
                                position={userLocation}
                                icon={{
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 8,
                                    fillColor: "#ff6b35",
                                    fillOpacity: 1,
                                    strokeColor: "#fff",
                                    strokeWeight: 2,
                                }}
                                title="You are here"
                            />

                            {/* Restaurant markers */}
                            {restaurants.map((r) => (
                                <MarkerF
                                    key={r.id}
                                    position={{ lat: r.lat, lng: r.lng }}
                                    onClick={() => setSelectedRestaurant(r.id)}
                                    icon={{
                                        path: google.maps.SymbolPath.CIRCLE,
                                        scale: 7,
                                        fillColor: selectedRestaurant === r.id ? "#f7931e" : "#e74c3c",
                                        fillOpacity: 1,
                                        strokeColor: "#fff",
                                        strokeWeight: 2,
                                    }}
                                >
                                    {selectedRestaurant === r.id && (
                                        <InfoWindowF
                                            position={{ lat: r.lat, lng: r.lng }}
                                            onCloseClick={() => setSelectedRestaurant(null)}
                                        >
                                            <div style={{ color: "#333", padding: "2px", maxWidth: "180px" }}>
                                                <strong style={{ fontSize: "13px" }}>{r.name}</strong>
                                                <div style={{ fontSize: "11px", marginTop: "3px" }}>
                                                    ⭐ {r.rating} · {getDistance(userLocation.lat, userLocation.lng, r.lat, r.lng)}
                                                </div>
                                            </div>
                                        </InfoWindowF>
                                    )}
                                </MarkerF>
                            ))}
                        </GoogleMap>
                    </div>

                    <div className="nearby-results-header">
                        <span>{restaurants.length} restaurants found</span>
                    </div>

                    <div className="nearby-list">
                        {restaurants.length === 0 ? (
                            <div className="nearby-empty">
                                <span>🍽️</span>
                                <p>No {cuisine} restaurants found nearby</p>
                            </div>
                        ) : (
                            restaurants.map((r, i) => (
                                <div
                                    key={r.id}
                                    className={`nearby-card ${selectedRestaurant === r.id ? "active" : ""}`}
                                    onClick={() => setSelectedRestaurant(r.id)}
                                >
                                    <div className="nc-rank">{i + 1}</div>
                                    <div className="nc-info">
                                        <div className="nc-name">{r.name}</div>
                                        <div className="nc-meta">
                                            <StarRating rating={r.rating} />
                                            <span className="nc-rating-num">{r.rating}</span>
                                            <span className="nc-reviews">({r.totalRatings})</span>
                                            <span className="nc-dot">·</span>
                                            <span className="nc-distance">
                                                {userLocation ? getDistance(userLocation.lat, userLocation.lng, r.lat, r.lng) : ""}
                                            </span>
                                        </div>
                                        <div className="nc-address">{r.address}</div>
                                        <div className="nc-tags">
                                            {r.openNow !== null && (
                                                <span className={`nc-tag ${r.openNow ? "open" : "closed"}`}>
                                                    {r.openNow ? "Open Now" : "Closed"}
                                                </span>
                                            )}
                                            {r.priceLevel !== null && (
                                                <span className="nc-tag price">
                                                    {"₹".repeat(r.priceLevel || 1)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nc-directions-btn"
                                        onClick={(e) => e.stopPropagation()}
                                        title="Get directions"
                                    >
                                        🗺️
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
