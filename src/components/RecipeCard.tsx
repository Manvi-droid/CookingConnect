"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
interface RecipeCardProps {
    recipe: {
        id: number;
        title: string;
        image: string;
        desc: string;
        chefId: string;
        difficulty: string;
        time: number;
        rating: number;
        likes: number;
        cuisine: string;
    };
    onClick: () => void;
    onChefClick: (chefId: string) => void;
    onSaveClick?: (recipeId: number) => void;
    chef?: { name: string; emoji: string };
}

export function RecipeCard({ recipe, onClick, onChefClick, onSaveClick, chef }: RecipeCardProps) {
    const { state, doLike, doSave } = useAppContext();
    const isLiked = !!state.likes[recipe.id];
    const isSaved = !!state.saved[recipe.id];
    const count = state.likeCounts[recipe.id] ?? recipe.likes;

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onSaveClick) {
            onSaveClick(recipe.id);
        } else {
            doSave(recipe.id);
        }
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        doLike(recipe.id, recipe.likes);
    };

    const handleChefClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChefClick(recipe.chefId);
    };

    return (
        <div className="recipe-card" onClick={onClick}>
            <div className="rc-img">
                <img src={recipe.image} alt={recipe.title} loading="lazy" />
                <span className={`rc-badge badge-${recipe.difficulty}`}>
                    {recipe.difficulty}
                </span>
                <button
                    className="rc-save-btn"
                    title={isSaved ? "Unsave" : "Save"}
                    onClick={handleSave}
                >
                    {isSaved ? "📌" : "🔖"}
                </button>
            </div>
            <div className="rc-body">
                <div className="rc-title">{recipe.title}</div>
                <div className="rc-desc">{recipe.desc}</div>
                <div className="rc-meta">
                    <span>⏱ {recipe.time}m</span>
                    <span>⭐ {recipe.rating}</span>
                    <span>🍽 {recipe.cuisine}</span>
                </div>
                <div className="rc-footer">
                    <div
                        className="rc-chef"
                        title="View chef profile"
                        onClick={handleChefClick}
                    >
                        <div className="rc-chef-av">{chef?.emoji || ""}</div>
                        {chef?.name || ""}
                    </div>
                    <button
                        className={`like-btn${isLiked ? " liked" : ""}`}
                        onClick={handleLike}
                    >
                        {isLiked ? "❤️" : "🤍"} {count >= 1000 ? (count / 1000).toFixed(1) + "K" : count}
                    </button>
                </div>
            </div>
        </div>
    );
}
