"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import { CHEFS } from "@/lib/data";
import { RecipeCard } from "./RecipeCard";

interface ChefPanelProps {
    chefId: string | null;
    onClose: () => void;
    onRecipeClick: (recipeId: number) => void;
    onSaveClick?: (recipeId: number) => void;
}

export function ChefPanel({ chefId, onClose, onRecipeClick, onSaveClick }: ChefPanelProps) {
    const { state, doFollow } = useAppContext();

    if (!chefId) return null;

    const chef = CHEFS.find((c) => c.id === chefId);
    if (!chef) return null;

    const RECIPES = require("@/lib/data").RECIPES;
    const chefRecipes = RECIPES.filter((r: any) => r.chefId === chefId);

    const isFollowing = !!state.follows[chefId];
    const followerCount = chef.followers + (state.followDelta[chefId] || 0);
    const fmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));

    return (
        <div className="panel-overlay" onClick={onClose}>
            <div className="chef-panel" onClick={(e) => e.stopPropagation()}>
                <button className="panel-close-btn" onClick={onClose}>
                    ✕
                </button>
                <div className="chef-panel-hero">
                    <div className="chef-panel-av">{chef.emoji}</div>
                    <div>
                        <h2 className="cp-name">{chef.name}</h2>
                        <div className="cp-specialty">{chef.specialty}</div>
                        <div className="cp-bio">{chef.bio}</div>
                        <div className="cp-stats">
                            <div className="cp-stat">
                                <strong>{fmt(followerCount)}</strong>
                                <span>Followers</span>
                            </div>
                            <div className="cp-stat">
                                <strong>{chefRecipes.length}</strong>
                                <span>Recipes</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chef-panel-action-row">
                    <button
                        className={`chef-panel-follow-btn ${isFollowing ? "flw" : "nflw"}`}
                        onClick={() => doFollow(chefId)}
                    >
                        {isFollowing ? "✓ Following" : "+ Follow Chef"}
                    </button>
                </div>
                <div className="chef-panel-body">
                    <div className="pg-subtitle">Recipes</div>
                    <div className="recipe-grid">
                        {chefRecipes.length === 0 ? (
                            <div className="empty">
                                <span className="ei">🍽️</span>
                                <h3>No recipes yet</h3>
                            </div>
                        ) : (
                            chefRecipes.map((r: any) => (
                                <RecipeCard
                                    key={r.id}
                                    recipe={r}
                                    onClick={() => onRecipeClick(r.id)}
                                    onChefClick={() => { }}
                                    onSaveClick={onSaveClick}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
