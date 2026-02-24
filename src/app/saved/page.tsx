"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { ChefPanel } from "@/components/ChefPanel";
import { SaveToFolderModal } from "@/components/SaveToFolderModal";
import { useAppContext } from "@/context/AppContext";
import { useSupabaseData } from "@/hooks/useSupabaseData";

export default function SavedPage() {
    const { state, deleteFolder } = useAppContext();
    const { recipes: RECIPES, chefs: CHEFS, loading } = useSupabaseData();
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
    const [selectedChefId, setSelectedChefId] = useState<string | null>(null);
    const [saveModalRecipeId, setSaveModalRecipeId] = useState<number | null>(null);
    const [activeFolderId, setActiveFolderId] = useState<string | null>(null); // null means 'All Saved'

    const sv = Object.values(state.saved).filter(Boolean).length;
    const lk = Object.values(state.likes).filter(Boolean).length;
    const fo = Object.keys(state.follows).filter((k) => state.follows[k]).length;

    const savedRecipes = RECIPES.filter((r) => {
        if (activeFolderId) {
            const folder = state.folders?.find(f => f.id === activeFolderId);
            return folder ? folder.recipeIds.includes(r.id) : false;
        }
        return state.saved[r.id];
    });

    const handleDeleteFolder = (folderId: string) => {
        if (confirm("Are you sure you want to delete this folder? Recipes will still be in 'All Saved'.")) {
            if (activeFolderId === folderId) setActiveFolderId(null);
            deleteFolder(folderId);
        }
    };

    if (loading) {
        return (
            <div className="screen-app active" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2>Loading Library... 📚</h2>
            </div>
        );
    }

    return (
        <div className="screen-app active" style={{ height: "100vh", overflow: "hidden" }}>
            <div className="app-shell">
                <Sidebar onOpenChefPanel={setSelectedChefId} followedChefs={CHEFS.filter((c) => state.follows[c.id])} />
                <div className="main-area">
                    <Topbar onSearch={() => { }} searchQuery="" />

                    <div className="page active" id="page-saved">
                        <div className="content">
                            <div className="pg-title">My Library</div>
                            <div className="pg-sub">Everything you've saved and liked</div>
                            <div className="stats-row">
                                <div className="stat-box">
                                    <div className="sn">{sv}</div>
                                    <div className="sl">Saved</div>
                                </div>
                                <div className="stat-box">
                                    <div className="sn">{lk}</div>
                                    <div className="sl">Liked</div>
                                </div>
                                <div className="stat-box">
                                    <div className="sn">{fo}</div>
                                    <div className="sl">Following</div>
                                </div>
                            </div>

                            <div className="folder-tabs" style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "12px", marginBottom: "20px" }}>
                                <button
                                    className={`chip ${activeFolderId === null ? "active" : ""}`}
                                    onClick={() => setActiveFolderId(null)}
                                >
                                    All Saved
                                </button>
                                {state.folders?.map(f => (
                                    <button
                                        key={f.id}
                                        className={`chip ${activeFolderId === f.id ? "active" : ""}`}
                                        onClick={() => setActiveFolderId(f.id)}
                                        style={{ display: "flex", alignItems: "center", gap: "6px" }}
                                    >
                                        <span>{f.name}</span>
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteFolder(f.id);
                                            }}
                                            style={{
                                                opacity: 0.6,
                                                fontSize: "14px",
                                                display: "inline-block",
                                                padding: "0 2px"
                                            }}
                                            title="Delete folder"
                                        >
                                            ✕
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="pg-subtitle">
                                {activeFolderId
                                    ? `📂 ${state.folders?.find(f => f.id === activeFolderId)?.name}`
                                    : "📌 All Saved Recipes"}
                            </div>
                            <div className="recipe-grid">
                                {savedRecipes.length === 0 ? (
                                    <div className="empty">
                                        <span className="ei">🔖</span>
                                        <h3>Nothing saved yet</h3>
                                        <p>Hit the bookmark icon on any recipe</p>
                                    </div>
                                ) : (
                                    savedRecipes.map((r) => (
                                        <RecipeCard
                                            key={r.id}
                                            recipe={r}
                                            onClick={() => setSelectedRecipeId(r.id)}
                                            onChefClick={setSelectedChefId}
                                            onSaveClick={setSaveModalRecipeId}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RecipeModal
                recipe={RECIPES.find((r) => r.id === selectedRecipeId)}
                chef={CHEFS.find((c) => c.id === RECIPES.find((r) => r.id === selectedRecipeId)?.chefid)}
                onClose={() => setSelectedRecipeId(null)}
                onChefClick={setSelectedChefId}
            />
            <ChefPanel
                chef={CHEFS.find((c) => c.id === selectedChefId)}
                recipes={RECIPES}
                onClose={() => setSelectedChefId(null)}
                onRecipeClick={setSelectedRecipeId}
            />
            <SaveToFolderModal
                recipeId={saveModalRecipeId}
                onClose={() => setSaveModalRecipeId(null)}
            />
        </div>
    );
}
