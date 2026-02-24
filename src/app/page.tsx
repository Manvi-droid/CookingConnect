"use client";

import React, { useState, useEffect } from "react";
import { COOKING_STYLES } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { ChefPanel } from "@/components/ChefPanel";
import { SaveToFolderModal } from "@/components/SaveToFolderModal";
import { useAppContext } from "@/context/AppContext";
import { useSupabaseData } from "@/hooks/useSupabaseData";

export default function FeedPage() {
  const { state } = useAppContext();
  const router = useRouter();
  const { recipes: RECIPES, chefs: CHEFS, loading } = useSupabaseData();

  const [searchQuery, setSearchQuery] = useState("");
  const [feedTab, setFeedTab] = useState("foryou");
  const [feedDiff, setFeedDiff] = useState("all");

  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [selectedChefId, setSelectedChefId] = useState<string | null>(null);
  const [saveModalRecipeId, setSaveModalRecipeId] = useState<number | null>(null);

  // Redirect to onboarding or auth if no user
  useEffect(() => {
    if (!state.displayName && !state.username) {
      router.push("/auth");
    } else if (state.isNewUser && state.userStyles.length === 0) {
      router.push("/onboarding");
    }
  }, [state, router]);

  // Derived state for the feed
  const followIds = Object.keys(state.follows).filter((k) => state.follows[k]);
  let list = [...RECIPES];

  if (searchQuery) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        CHEFS.find((c) => c.id === r.chefid)?.name.toLowerCase().includes(q)
    );
  }

  if (feedDiff !== "all") {
    list = list.filter((r) => r.difficulty === feedDiff);
  }

  if (feedTab === "following") {
    list = list.filter((r) => followIds.includes(r.chefId));
  } else if (feedTab === "liked") {
    list = list.filter((r) => !!state.likes[r.id]);
  } else if (state.userStyles.length > 0) {
    list.sort((a, b) => {
      const score = (r: typeof a) =>
        (followIds.includes(r.chefid) ? 10 : 0) +
        (r.styles || []).filter((s: string) => state.userStyles.includes(s)).length;
      return score(b) - score(a);
    });
  }

  const hasTastes = state.userStyles.length > 0;
  const hasFollows = followIds.length > 0;

  if (loading) {
    return (
      <div className="screen-app active" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2>Loading Recipes... 🍳</h2>
      </div>
    );
  }

  return (
    <div className="screen-app active" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="app-shell">
        <Sidebar onOpenChefPanel={setSelectedChefId} followedChefs={CHEFS.filter((c) => state.follows[c.id])} />
        <div className="main-area">
          <Topbar onSearch={setSearchQuery} searchQuery={searchQuery} />

          <div className="page active" id="page-feed">
            <div className="content">
              <div className="pg-title">
                {feedTab === "liked"
                  ? "Liked Recipes"
                  : feedTab === "following"
                    ? "Your Feed"
                    : `Hey, ${state.displayName || state.username} 👋`}
              </div>

              <div className="pg-sub">
                {feedTab === "liked" && `${Object.values(state.likes).filter(Boolean).length} liked recipes`}
                {feedTab === "foryou" && hasTastes && hasFollows && `Curated from ${state.userStyles.length} style picks & ${followIds.length} followed chefs`}
              </div>

              <input
                className="chefs-search-input"
                style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }}
                placeholder="🔍 Search recipes, cuisines, chefs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {hasTastes && feedTab === "foryou" && (
                <div className="curated">
                  <div style={{ fontSize: "28px" }}>✨</div>
                  <div>
                    <h3>Personalised for you</h3>
                    <p>
                      Based on your love of{" "}
                      {state.userStyles
                        .slice(0, 3)
                        .map((id) => COOKING_STYLES.find((s) => s.id === id)?.label)
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              )}

              <div className="feed-tabs">
                <button
                  className={`feed-tab ${feedTab === "foryou" ? "active" : ""}`}
                  onClick={() => setFeedTab("foryou")}
                >
                  For You
                </button>
                <button
                  className={`feed-tab ${feedTab === "following" ? "active" : ""}`}
                  onClick={() => setFeedTab("following")}
                >
                  Following
                </button>
                <button
                  className={`feed-tab ${feedTab === "liked" ? "active" : ""}`}
                  onClick={() => setFeedTab("liked")}
                >
                  Liked
                </button>
              </div>

              <div className="filters">
                <button
                  className={`chip ${feedDiff === "all" ? "active" : ""}`}
                  onClick={() => setFeedDiff("all")}
                >
                  All
                </button>
                <button
                  className={`chip ${feedDiff === "easy" ? "active" : ""}`}
                  onClick={() => setFeedDiff("easy")}
                >
                  Easy
                </button>
                <button
                  className={`chip ${feedDiff === "medium" ? "active" : ""}`}
                  onClick={() => setFeedDiff("medium")}
                >
                  Medium
                </button>
                <button
                  className={`chip ${feedDiff === "hard" ? "active" : ""}`}
                  onClick={() => setFeedDiff("hard")}
                >
                  Hard
                </button>
              </div>

              <div className="recipe-grid">
                {list.length === 0 ? (
                  <div className="empty">
                    <span className="ei">{feedTab === "following" ? "👨‍🍳" : "🔍"}</span>
                    <h3>
                      {feedTab === "following"
                        ? "No recipes yet"
                        : feedTab === "liked"
                          ? "No liked recipes"
                          : "No results"}
                    </h3>
                    <p>
                      {feedTab === "following"
                        ? "Follow chefs to see their recipes"
                        : "Try a different filter"}
                    </p>
                  </div>
                ) : (
                  list.map((r) => (
                    <RecipeCard
                      key={r.id}
                      recipe={r}
                      chef={CHEFS.find((c) => c.id === r.chefid)}
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
