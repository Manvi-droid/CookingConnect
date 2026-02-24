"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ChefPanel } from "@/components/ChefPanel";
import { createClient } from "@/utils/supabase/client";
import { useAppContext } from "@/context/AppContext";
import { useSupabaseData } from "@/hooks/useSupabaseData";

export default function CreatePage() {
    const { state } = useAppContext();
    const { chefs: CHEFS, recipes: RECIPES, loading } = useSupabaseData();
    const [selectedChefId, setSelectedChefId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [time, setTime] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [method, setMethod] = useState("");
    const [cuisine, setCuisine] = useState("Italian");
    const [difficulty, setDifficulty] = useState("medium");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMsg, setToastMsg] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageURL(URL.createObjectURL(file));
        }
    };

    const handlePublish = async () => {
        if (!title.trim() || !desc.trim() || !time || !ingredients.trim() || !method.trim()) {
            showToast("⚠️ Fill in all required fields (title, description, time, ingredients, method)");
            return;
        }

        setIsSubmitting(true);
        const supabase = createClient();

        // Get the actual authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error("Auth Error:", authError);
            showToast("❌ You must be signed in to publish a recipe.");
            setIsSubmitting(false);
            return;
        }

        const { error } = await supabase.from('recipes').insert([
            {
                id: Math.floor(Date.now() % 2147483647), // Generate a random positive integer for ID
                title,
                desc,
                time: parseInt(time),
                image: imageURL || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
                ingredients: ingredients.split('\n').filter(i => i.trim()),
                steps: method.split('\n').filter(m => m.trim()),
                cuisine,
                difficulty,
                rating: 0,
                likes: 0,
                styles: [],
                chefid: user.id

            }
        ]);

        setIsSubmitting(false);

        if (error) {
            console.error("Failed to insert recipe:", error.message, error.details, error.hint);
            showToast(`❌ Failed to publish: ${error.message}`);
            return;
        }

        showToast("🎉 Recipe published successfully!");
        setTitle("");
        setDesc("");
        setTime("");
        setImageURL("");
        setIngredients("");
        setMethod("");
    };

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(""), 2800);
    };

    if (loading) return null;

    return (
        <div className="screen-app active" style={{ height: "100vh", overflow: "hidden" }}>
            <div className="app-shell">
                <Sidebar onOpenChefPanel={setSelectedChefId} followedChefs={CHEFS.filter((c) => state.follows[c.id])} />
                <div className="main-area">
                    <Topbar onSearch={() => { }} searchQuery="" />

                    <div className="page active" id="page-create">
                        <div className="content">
                            <div className="pg-title">Create a Recipe</div>
                            <div className="pg-sub">Share your culinary creation with the community</div>
                            <div className="create-form">
                                <div className="form-grid">
                                    <div className="field-group">
                                        <label>RECIPE TITLE</label>
                                        <input
                                            placeholder="e.g. Perfect Carbonara"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="field-group">
                                        <label>CUISINE</label>
                                        <select>
                                            <option>Italian</option>
                                            <option>Japanese</option>
                                            <option>American</option>
                                            <option>Indian</option>
                                            <option>Thai</option>
                                            <option>French</option>
                                            <option>Korean</option>
                                            <option>Chinese</option>
                                            <option>Fusion</option>
                                            <option>Mexican</option>
                                        </select>
                                    </div>
                                    <div className="field-group">
                                        <label>DIFFICULTY</label>
                                        <select defaultValue="medium">
                                            <option value="easy">easy</option>
                                            <option value="medium">medium</option>
                                            <option value="hard">hard</option>
                                        </select>
                                    </div>
                                    <div className="field-group">
                                        <label>COOK TIME (MIN)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            placeholder="30"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <label>SHORT DESCRIPTION</label>
                                    <input
                                        placeholder="e.g. Crispy guanciale, silky egg sauce, no cream"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                </div>
                                <div className="field-group">
                                    <label>RECIPE IMAGE</label>
                                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                        <label
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: "10px 16px",
                                                background: "var(--s2)",
                                                border: "1px solid var(--border)",
                                                borderRadius: "10px",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                                color: "var(--text)",
                                                transition: "all 0.15s"
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
                                            onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                                        >
                                            <span style={{ marginRight: "6px" }}>📷</span> Upload Photo
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                        <div style={{ flex: 1 }}>
                                            <input
                                                placeholder="Or paste an image URL instead"
                                                value={imageURL}
                                                onChange={(e) => setImageURL(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {imageURL && (
                                        <div style={{ marginTop: "14px", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border)", maxHeight: "200px" }}>
                                            <img src={imageURL} alt="Preview" style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
                                        </div>
                                    )}
                                </div>
                                <div className="field-group">
                                    <label>INGREDIENTS (one per line)</label>
                                    <textarea
                                        rows={5}
                                        placeholder="200g spaghetti&#10;150g guanciale&#10;4 egg yolks"
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="field-group">
                                    <label>METHOD (one per line)</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Cook pasta al dente&#10;Fry guanciale crispy&#10;Combine off heat"
                                        value={method}
                                        onChange={(e) => setMethod(e.target.value)}
                                    ></textarea>
                                </div>
                                <button className="publish-btn" onClick={handlePublish}>
                                    🚀 Publish Recipe
                                </button>
                            </div>
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
