"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { ChefPanel } from "@/components/ChefPanel";
import { SaveToFolderModal } from "@/components/SaveToFolderModal";
import { useAppContext } from "@/context/AppContext";
import { RECIPES, COOKING_STYLES, DIETS, AVATARS } from "@/lib/data";
import Link from "next/link";

export default function ProfilePage() {
    const { state, updateProfile } = useAppContext();
    const [profileTab, setProfileTab] = useState("saved");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
    const [selectedChefId, setSelectedChefId] = useState<string | null>(null);
    const [saveModalRecipeId, setSaveModalRecipeId] = useState<number | null>(null);

    // Edit Profile State
    const [editName, setEditName] = useState(state.displayName);
    const [editUser, setEditUser] = useState(state.username);
    const [editBio, setEditBio] = useState(state.bio);
    const [editAvatar, setEditAvatar] = useState(state.avatar);

    const sv = Object.values(state.saved).filter(Boolean).length;
    const lk = Object.values(state.likes).filter(Boolean).length;
    const fo = Object.keys(state.follows).filter((k) => state.follows[k]).length;

    const savedRecipes = RECIPES.filter((r) => state.saved[r.id]);
    const likedRecipes = RECIPES.filter((r) => state.likes[r.id]);

    const displayList = profileTab === "saved" ? savedRecipes : likedRecipes;

    const handleSaveProfile = () => {
        updateProfile(editName, editUser, editBio, editAvatar);
        setIsEditModalOpen(false);
    };

    return (
        <div className="screen-app active" style={{ height: "100vh", overflow: "hidden" }}>
            <div className="app-shell">
                <Sidebar onOpenChefPanel={setSelectedChefId} />
                <div className="main-area">
                    <Topbar onSearch={() => { }} searchQuery="" />

                    <div className="page active" id="page-profile">
                        <div className="profile-hero">
                            <div className="profile-cover"></div>
                            <div className="profile-info-row">
                                <div className="profile-av-wrap">
                                    <div className="profile-av">{state.avatar}</div>
                                </div>
                                <div className="profile-meta">
                                    <div className="profile-name-row">
                                        <h1 className="profile-name">{state.displayName}</h1>
                                        <button
                                            className="btn-edit-profile"
                                            onClick={() => setIsEditModalOpen(true)}
                                        >
                                            ✏️ Edit Profile
                                        </button>
                                    </div>
                                    <div className="profile-username">@{state.username}</div>
                                    <div className="profile-bio-text">{state.bio}</div>
                                    <div className="profile-stats-row">
                                        <div className="pstat">
                                            <strong>{sv}</strong>
                                            <span>Saved</span>
                                        </div>
                                        <div className="pstat">
                                            <strong>{fo}</strong>
                                            <span>Following</span>
                                        </div>
                                        <div className="pstat">
                                            <strong>{lk}</strong>
                                            <span>Liked</span>
                                        </div>
                                    </div>
                                    <div className="profile-tags-row">
                                        {state.userStyles.slice(0, 3).map((id) => (
                                            <span key={id} className="profile-tag">
                                                {COOKING_STYLES.find((s) => s.id === id)?.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content" style={{ paddingTop: "20px" }}>
                            <div className="profile-tabs">
                                <button
                                    className={`profile-tab ${profileTab === "saved" ? "active" : ""}`}
                                    onClick={() => setProfileTab("saved")}
                                >
                                    Saved
                                </button>
                                <button
                                    className={`profile-tab ${profileTab === "liked" ? "active" : ""}`}
                                    onClick={() => setProfileTab("liked")}
                                >
                                    Liked
                                </button>
                                <button
                                    className={`profile-tab ${profileTab === "tastes" ? "active" : ""}`}
                                    onClick={() => setProfileTab("tastes")}
                                >
                                    My Tastes
                                </button>
                            </div>

                            {profileTab !== "tastes" ? (
                                <div className="recipe-grid" style={{ marginTop: "20px" }}>
                                    {displayList.length === 0 ? (
                                        <div className="empty">
                                            <span className="ei">📭</span>
                                            <h3>Nothing here yet</h3>
                                            <p>Start exploring recipes</p>
                                        </div>
                                    ) : (
                                        displayList.map((r) => (
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
                            ) : (
                                <div style={{ marginTop: "20px" }}>
                                    <div className="pg-subtitle" style={{ marginBottom: "12px" }}>
                                        Your cooking styles
                                    </div>
                                    <div className="tag-cloud">
                                        {state.userStyles.length === 0 && <p className="text-sm text-gray-500">None selected</p>}
                                        {state.userStyles.map((id) => (
                                            <span key={id} className="tag-cloud-item">
                                                {COOKING_STYLES.find((s) => s.id === id)?.label}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pg-subtitle" style={{ marginBottom: "12px", marginTop: "24px" }}>
                                        Dietary preferences
                                    </div>
                                    <div className="tag-cloud">
                                        {state.userDiets.length === 0 && <p className="text-sm text-gray-500">None selected</p>}
                                        {state.userDiets.map((id) => (
                                            <span key={id} className="tag-cloud-item">
                                                {DIETS.find((d) => d.id === id)?.label}
                                            </span>
                                        ))}
                                    </div>

                                    <Link href="/prefs" className="link-prefs" style={{ display: "inline-block", marginTop: "14px" }}>
                                        Update in My Tastes →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <RecipeModal
                recipeId={selectedRecipeId}
                onClose={() => setSelectedRecipeId(null)}
                onChefClick={setSelectedChefId}
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

            {isEditModalOpen && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-box" style={{ maxWidth: "460px" }} onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setIsEditModalOpen(false)}>
                            ✕
                        </button>
                        <div className="modal-body">
                            <h2 style={{ marginBottom: "20px", fontFamily: "'Fraunces', serif" }}>
                                Edit Profile
                            </h2>
                            <div className="avatar-row">
                                <div className="edit-av-current">{editAvatar}</div>
                                <div>
                                    <div className="field-group-label">CHOOSE AVATAR</div>
                                    <div className="avatar-options">
                                        {AVATARS.map((emoji) => (
                                            <div
                                                key={emoji}
                                                className={`av-opt ${editAvatar === emoji ? "sel" : ""}`}
                                                onClick={() => setEditAvatar(emoji)}
                                            >
                                                {emoji}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="field-group">
                                <label>DISPLAY NAME</label>
                                <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                            </div>
                            <div className="field-group">
                                <label>USERNAME</label>
                                <input value={editUser} onChange={(e) => setEditUser(e.target.value)} />
                            </div>
                            <div className="field-group">
                                <label>BIO</label>
                                <textarea
                                    rows={3}
                                    value={editBio}
                                    onChange={(e) => setEditBio(e.target.value)}
                                    placeholder="Tell us about yourself…"
                                ></textarea>
                            </div>
                            <button className="btn-primary" onClick={handleSaveProfile}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
