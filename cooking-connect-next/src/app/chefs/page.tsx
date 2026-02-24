"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { RecipeModal } from "@/components/RecipeModal";
import { ChefPanel } from "@/components/ChefPanel";
import { SaveToFolderModal } from "@/components/SaveToFolderModal";
import { useAppContext } from "@/context/AppContext";
import { CHEFS } from "@/lib/data";

export default function ChefsPage() {
    const { state, doFollow } = useAppContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
    const [selectedChefId, setSelectedChefId] = useState<string | null>(null);
    const [saveModalRecipeId, setSaveModalRecipeId] = useState<number | null>(null);

    const fmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));

    const list = CHEFS.filter(
        (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="screen-app active" style={{ height: "100vh", overflow: "hidden" }}>
            <div className="app-shell">
                <Sidebar onOpenChefPanel={setSelectedChefId} />
                <div className="main-area">
                    <Topbar onSearch={() => { }} searchQuery="" />

                    <div className="page active" id="page-chefs">
                        <div className="content">
                            <div className="pg-title">Discover Chefs</div>
                            <div className="pg-sub">Click any chef card to view their full profile</div>

                            <input
                                className="chefs-search-input"
                                placeholder="🔍  Search by name or specialty…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <div className="chefs-grid">
                                {list.map((c) => {
                                    const isFollowing = !!state.follows[c.id];
                                    const followerCount = c.followers + (state.followDelta[c.id] || 0);

                                    return (
                                        <div
                                            key={c.id}
                                            className="chef-card"
                                            onClick={() => setSelectedChefId(c.id)}
                                        >
                                            <div className="cc-top">
                                                <div className="cc-av">{c.emoji}</div>
                                                <div className="cc-info">
                                                    <h3>{c.name}</h3>
                                                    <div className="sp">{c.specialty}</div>
                                                </div>
                                            </div>
                                            <div className="cc-bio">{c.bio}</div>
                                            <div className="cc-stats">
                                                <div className="cc-stat">
                                                    <span>{fmt(followerCount)}</span>
                                                    <p>Followers</p>
                                                </div>
                                            </div>
                                            <button
                                                className={`follow-btn ${isFollowing ? "flw" : "nflw"}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    doFollow(c.id);
                                                }}
                                            >
                                                {isFollowing ? "✓ Following" : "+ Follow"}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RecipeModal
                recipeId={selectedRecipeId}
                onClose={() => setSelectedRecipeId(null)}
                onChefClick={setSelectedChefId}
                onSaveClick={setSaveModalRecipeId}
            />
            <ChefPanel
                chefId={selectedChefId}
                onClose={() => setSelectedChefId(null)}
                onRecipeClick={setSelectedRecipeId}
                onSaveClick={setSaveModalRecipeId}
            />
            <SaveToFolderModal
                recipeId={saveModalRecipeId}
                onClose={() => setSaveModalRecipeId(null)}
            />
        </div>
    );
}
