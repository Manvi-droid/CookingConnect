"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";

interface RecipeModalProps {
    recipe: any | null;
    chef?: { name: string; emoji: string; followers: number } | null;
    onClose: () => void;
    onChefClick: (chefId: string) => void;
    onSaveClick?: (recipeId: number) => void;
}

export function RecipeModal({ recipe, chef, onClose, onChefClick, onSaveClick }: RecipeModalProps) {
    const { state, doLike, doFollow, doSave } = useAppContext();

    if (!recipe) return null;

    const isLiked = !!state.likes[recipe.id];
    const isSaved = !!state.saved[recipe.id];
    const isFollowing = !!state.follows[recipe.chefid];
    const likeCount = state.likeCounts[recipe.id] ?? recipe.likes;
    const followerCount = (chef?.followers || 0) + (state.followDelta[recipe.chefid] || 0);

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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h3 style={{ margin: 0 }}>Ingredients</h3>
                            <button
                                className="ai-btn-global"
                                onClick={() => alert("AI Ingredient Substitution coming soon! We will use AI to suggest alternatives based on your dietary preferences or pantry availability.")}
                                title="Auto-substitute ingredients with AI"
                            >
                                ✨ AI Substitute
                            </button>
                        </div>
                        <div className="ing-list">
                            {recipe.ingredients.map((ing: string, i: number) => (
                                <span key={i} className="ing-tag">
                                    <span>{ing}</span>
                                    <button
                                        className="ai-btn-inline"
                                        onClick={() => alert(`AI Substitution for '${ing}' coming soon!`)}
                                        title="Find substitute for this ingredient"
                                    >
                                        ✨
                                    </button>
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
                            onChefClick(recipe.chefid);
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
                            onClick={() => doFollow(recipe.chefid)}
                        >
                            {isFollowing ? "✓ Following" : "+ Follow"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
