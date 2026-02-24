"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import { RecipeCard } from "./RecipeCard";

interface ChefPanelProps {
    chef?: { id: string; name: string; emoji: string; specialty: string; bio: string; followers: number } | null;
    recipes?: any[];
    onClose: () => void;
    onRecipeClick: (recipeId: number) => void;
    onSaveClick?: (recipeId: number) => void;
}

export function ChefPanel({ chef, recipes = [], onClose, onRecipeClick, onSaveClick }: ChefPanelProps) {
    const { state, doFollow } = useAppContext();

    if (!chef) return null;

    const chefRecipes = recipes.filter((r: any) => r.chefid === chef.id);

    const isFollowing = !!state.follows[chef.id];
    const followerCount = chef.followers + (state.followDelta[chef.id] || 0);
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
                        onClick={() => doFollow(chef.id)}
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
