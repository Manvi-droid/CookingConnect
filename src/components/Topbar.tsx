"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

interface TopbarProps {
    onSearch: (query: string) => void;
    searchQuery: string;
}

export function Topbar({ onSearch, searchQuery }: TopbarProps) {
    const { state } = useAppContext();

    return (
        <header className="topbar">
            <div style={{ flex: 1 }}></div>
            <div className="tb-right">
                <Link href="/profile" className="user-pill">
                    <div className="user-av">{state.avatar}</div>
                    <div className="user-pill-name">{state.displayName || state.username}</div>
                </Link>
            </div>
        </header>
    );
}
