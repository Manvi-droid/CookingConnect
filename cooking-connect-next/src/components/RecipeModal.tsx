"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import { CHEFS } from "@/lib/data";

interface RecipeModalProps {
    recipeId: number | null;
    onClose: () => void;
    onChefClick: (chefId: string) => void;
    onSaveClick?: (recipeId: number) => void;
}

export function RecipeModal({ recipeId, onClose, onChefClick, onSaveClick }: RecipeModalProps) {
    const { state, doLike, doFollow, doSave } = useAppContext();

    if (!recipeId) return null;

    // Ideally pass this in, but for simplicity we fetch it here since the data is static
    const RECIPES = require("@/lib/data").RECIPES;
    const recipe = RECIPES.find((r: any) => r.id === recipeId);
    if (!recipe) return null;

    const chef = CHEFS.find((c) => c.id === recipe.chefId);
    const isLiked = !!state.likes[recipe.id];
    const isSaved = !!state.saved[recipe.id];
    const isFollowing = !!state.follows[recipe.chefId];
    const likeCount = state.likeCounts[recipe.id] ?? recipe.likes;
    const followerCount = (chef?.followers || 0) + (state.followDelta[recipe.chefId] || 0);

    const fmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <div style={{ position: "absolute", top: 16, right: 60, zIndex: 10 }}>
                    <button
                        className="rc-save-btn"
                        style={{ position: 'relative', top: 0, right: 0 }}
                        title={isSaved ? "Unsave" : "Save to folder"}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onSaveClick) onSaveClick(recipe.id);
                            else doSave(recipe.id);
                        }}
                    >
                        {isSaved ? "📌" : "🔖"}
                    </button>
                </div>
                <button className="modal-close-btn" onClick={onClose}>
                    ✕
                </button>
                <img className="modal-hero" src={recipe.image} alt={recipe.title} />
                <div className="modal-body">
                    <h2>{recipe.title}</h2>
                    <div className="modal-desc">{recipe.desc}</div>
                    <div className="modal-meta">
                        <span>
                            ⏱ <strong>{recipe.time} min</strong>
                        </span>
                        <span>
                            ⭐ <strong>{recipe.rating}</strong>
                        </span>
                        <span>
                            📊 <strong>{recipe.difficulty}</strong>
                        </span>
                        <span>
                            🌍 <strong>{recipe.cuisine}</strong>
                        </span>
                    </div>
                    <div className="modal-sec">
                        <h3>Ingredients</h3>
                        <div className="ing-list">
                            {recipe.ingredients.map((ing: string, i: number) => (
                                <span key={i} className="ing-tag">
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="modal-sec">
                        <h3>Method</h3>
                        <ol className="steps-list">
                            {recipe.steps.map((step: string, i: number) => (
                                <li key={i}>
                                    <div className="step-n">{i + 1}</div>
                                    <div className="step-t">{step}</div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="modal-chef-bar">
                    <div
                        className="modal-chef"
                        title="View chef profile"
                        onClick={() => {
                            onClose();
                            onChefClick(recipe.chefId);
                        }}
                    >
                        <div className="modal-chef-av">{chef?.emoji || ""}</div>
                        <div className="modal-chef-info">
                            <h4>{chef?.name || ""}</h4>
                            <p>{fmt(followerCount)} followers</p>
                        </div>
                        <span className="modal-chef-arrow">→</span>
                    </div>
                    <div className="modal-actions">
                        <button
                            className={`btn-mlike ${isLiked ? "liked" : ""}`}
                            onClick={() => doLike(recipe.id, recipe.likes)}
                        >
                            {isLiked ? "❤️" : "🤍"} <span>{fmt(likeCount)}</span>
                        </button>
                        <button
                            className={`btn-mfollow ${isFollowing ? "following" : ""}`}
                            onClick={() => doFollow(recipe.chefId)}
                        >
                            {isFollowing ? "✓ Following" : "+ Follow"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
