"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";

interface SaveToFolderModalProps {
    recipeId: number | null;
    onClose: () => void;
}

export function SaveToFolderModal({ recipeId, onClose }: SaveToFolderModalProps) {
    const { state, createFolder, toggleRecipeInFolder, doSave } = useAppContext();
    const [newFolderName, setNewFolderName] = useState("");

    if (!recipeId) return null;

    const handleCreateFolder = () => {
        if (newFolderName.trim()) {
            createFolder(newFolderName.trim());
            setNewFolderName("");
        }
    };

    const isSavedBase = !!state.saved[recipeId];

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10000 }}>
            <div className="modal-box" style={{ maxWidth: "400px" }} onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    ✕
                </button>
                <div className="modal-body">
                    <h2 style={{ marginBottom: "8px", fontFamily: "'Fraunces', serif" }}>
                        Save Recipe
                    </h2>
                    <p style={{ color: "var(--text-light)", marginBottom: "20px", fontSize: "14px" }}>
                        Choose where you want to save this recipe.
                    </p>

                    <div className="folder-list" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", maxHeight: "250px", overflowY: "auto" }}>
                        {/* Base "All Saved" toggle */}
                        <label className="folder-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "var(--bg-light)", borderRadius: "12px", cursor: "pointer" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontSize: "20px" }}>🔖</span>
                                <span style={{ fontWeight: 600 }}>All Saved</span>
                            </div>
                            <input
                                type="checkbox"
                                checked={isSavedBase}
                                onChange={() => doSave(recipeId)}
                                style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }}
                            />
                        </label>

                        {/* Custom Folders */}
                        {state.folders?.map(folder => {
                            const inFolder = folder.recipeIds.includes(recipeId);
                            return (
                                <label key={folder.id} className="folder-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "var(--bg-light)", borderRadius: "12px", cursor: "pointer" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <span style={{ fontSize: "20px" }}>📁</span>
                                        <span style={{ fontWeight: 600 }}>{folder.name}</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={inFolder}
                                        onChange={() => toggleRecipeInFolder(recipeId, folder.id)}
                                        style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                        <input
                            type="text"
                            placeholder="New folder name..."
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                            style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid #E2E8F0", outline: "none" }}
                        />
                        <button
                            onClick={handleCreateFolder}
                            disabled={!newFolderName.trim()}
                            style={{ padding: "0 16px", background: "var(--text-dark)", color: "white", borderRadius: "12px", fontWeight: 600, opacity: newFolderName.trim() ? 1 : 0.5 }}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
