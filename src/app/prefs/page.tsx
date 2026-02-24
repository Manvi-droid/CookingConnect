"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ChefPanel } from "@/components/ChefPanel";
import { useAppContext } from "@/context/AppContext";
import { COOKING_STYLES, DIETS } from "@/lib/data";
import { useSupabaseData } from "@/hooks/useSupabaseData";

export default function PrefsPage() {
    const { state, updatePrefs } = useAppContext();
    const { chefs: CHEFS, recipes: RECIPES, loading } = useSupabaseData();
    const [selectedChefId, setSelectedChefId] = useState<string | null>(null);

    const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());
    const [selectedDiets, setSelectedDiets] = useState<Set<string>>(new Set());
    const [toastMsg, setToastMsg] = useState("");

    useEffect(() => {
        setSelectedStyles(new Set(state.userStyles));
        setSelectedDiets(new Set(state.userDiets));
    }, [state.userStyles, state.userDiets]);

    const toggleStyle = (id: string) => {
        const next = new Set(selectedStyles);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedStyles(next);
    };

    const toggleDiet = (id: string) => {
        const next = new Set(selectedDiets);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedDiets(next);
    };

    const handleSave = () => {
        updatePrefs(Array.from(selectedStyles), Array.from(selectedDiets));
        setToastMsg("✅ Preferences saved — feed updated!");
        setTimeout(() => setToastMsg(""), 2800);
    };

    return (
        <div className="screen-app active" style={{ height: "100vh", overflow: "hidden" }}>
            <div className="app-shell">
                <Sidebar onOpenChefPanel={setSelectedChefId} followedChefs={CHEFS.filter((c) => state.follows[c.id])} />
                <div className="main-area">
                    <Topbar onSearch={() => { }} searchQuery="" />

                    <div className="page active" id="page-prefs">
                        <div className="content">
                            <div className="pg-title">My Tastes</div>
                            <div className="pg-sub">Your feed updates the moment you save</div>

                            <div className="prefs-box">
                                <div className="prefs-box-title">
                                    🎨 Cooking Styles <span className="prefs-count">{selectedStyles.size} selected</span>
                                </div>
                                <div className="style-grid">
                                    {COOKING_STYLES.map((s) => {
                                        const isSelected = selectedStyles.has(s.id);
                                        return (
                                            <div
                                                key={s.id}
                                                className={`style-card ${isSelected ? "sel" : ""}`}
                                                onClick={() => toggleStyle(s.id)}
                                            >
                                                <span className="sc-icon">{s.icon}</span>
                                                <div className="sc-label">{s.label}</div>
                                                <div className="sc-desc">{s.desc}</div>
                                                {isSelected && <div className="sel-check">✓</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="prefs-box" style={{ marginTop: "16px" }}>
                                <div className="prefs-box-title">
                                    🥗 Dietary Preferences <span className="prefs-count">{selectedDiets.size} selected</span>
                                </div>
                                <div className="diet-grid">
                                    {DIETS.map((d) => {
                                        const isSelected = selectedDiets.has(d.id);
                                        return (
                                            <div
                                                key={d.id}
                                                className={`diet-card ${isSelected ? "sel" : ""}`}
                                                onClick={() => toggleDiet(d.id)}
                                            >
                                                <span className="di">{d.icon}</span>
                                                <div>
                                                    <div className="dl">{d.label}</div>
                                                    <div className="dd">{d.desc}</div>
                                                </div>
                                                {isSelected && <div className="sel-check" style={{ position: "absolute", right: 8, top: 8 }}>✓</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <button className="save-prefs-btn" onClick={handleSave}>
                                Save &amp; Update Feed
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ChefPanel
                chef={CHEFS.find((c) => c.id === selectedChefId)}
                recipes={RECIPES}
                onClose={() => setSelectedChefId(null)}
                onRecipeClick={() => { }}
            />
            <div className={`toast ${toastMsg ? "show" : ""}`}>{toastMsg}</div>
        </div>
    );
}
