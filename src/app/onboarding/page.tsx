"use client";

import React, { useState } from "react";
import { COOKING_STYLES, DIETS } from "@/lib/data";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useSupabaseData } from "@/hooks/useSupabaseData";

export default function OnboardingPage() {
    const { updatePrefs, doFollow, state: ctxState } = useAppContext();
    const router = useRouter();
    const { chefs: CHEFS } = useSupabaseData();

    const [step, setStep] = useState(1);
    const [obStyles, setObStyles] = useState<Set<string>>(new Set());
    const [obDiets, setObDiets] = useState<Set<string>>(new Set());
    const [obChefs, setObChefs] = useState<Set<string>>(new Set());

    const toggleSet = (set: Set<string>, id: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>) => {
        const next = new Set(set);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setter(next);
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            finishOnboarding();
        }
    };

    const finishOnboarding = () => {
        updatePrefs(Array.from(obStyles), Array.from(obDiets));
        obChefs.forEach((id) => doFollow(id));
        router.push("/");
    };

    const fmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n));

    return (
        <div className="screen-onboard screen active">
            <div className="ob-progress-bar">
                <div id="ob-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
            <div className="ob-header">
                <span className="brand" style={{ fontSize: "20px" }}>🍳 RecipeConnect</span>
                <span className="ob-step-lbl">Step {step} of 3</span>
            </div>

            {step === 1 && (
                <div className="ob-body">
                    <div className="ob-eyebrow">STEP 1 — COOKING STYLES</div>
                    <h1 className="ob-title">What's your cooking vibe?</h1>
                    <p className="ob-sub">Pick at least 3 — your feed will be curated around them</p>
                    <div className="style-grid">
                        {COOKING_STYLES.map((s) => {
                            const sel = obStyles.has(s.id);
                            return (
                                <div
                                    key={s.id}
                                    className={`style-card ${sel ? "sel" : ""}`}
                                    onClick={() => toggleSet(obStyles, s.id, setObStyles)}
                                >
                                    <span className="sc-icon">{s.icon}</span>
                                    <div className="sc-label">{s.label}</div>
                                    <div className="sc-desc">{s.desc}</div>
                                    {sel && <div className="sel-check">✓</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="ob-body">
                    <div className="ob-eyebrow">STEP 2 — DIETARY PREFERENCES</div>
                    <h1 className="ob-title">Any dietary preferences?</h1>
                    <p className="ob-sub">We'll filter and flag recipes that match your needs</p>
                    <div className="diet-grid">
                        {DIETS.map((d) => {
                            const sel = obDiets.has(d.id);
                            return (
                                <div
                                    key={d.id}
                                    className={`diet-card ${sel ? "sel" : ""}`}
                                    onClick={() => toggleSet(obDiets, d.id, setObDiets)}
                                >
                                    <span className="di">{d.icon}</span>
                                    <div>
                                        <div className="dl">{d.label}</div>
                                        <div className="dd">{d.desc}</div>
                                    </div>
                                    {sel && <div className="sel-check" style={{ position: "absolute", right: 8, top: 8 }}>✓</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="ob-body">
                    <div className="ob-eyebrow">STEP 3 — FOLLOW CHEFS</div>
                    <h1 className="ob-title">Follow your favourite chefs</h1>
                    <p className="ob-sub">Their recipes appear first in your personalised feed</p>
                    <div className="chef-ob-grid">
                        {CHEFS.map((c) => {
                            const sel = obChefs.has(c.id);
                            const followerCount = c.followers + (ctxState.followDelta[c.id] || 0);
                            return (
                                <div
                                    key={c.id}
                                    className={`chef-ob-card ${sel ? "sel" : ""}`}
                                    onClick={() => toggleSet(obChefs, c.id, setObChefs)}
                                >
                                    <span className="chef-ob-emoji">{c.emoji}</span>
                                    <h4>{c.name}</h4>
                                    <div className="specialty">{c.specialty}</div>
                                    <div className="fcount">👥 {fmt(followerCount)} followers</div>
                                    {sel && <div className="sel-check">✓</div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="ob-footer">
                <span className="ob-hint">
                    {step === 1 &&
                        `${obStyles.size} selected — ${obStyles.size < 3 ? "pick at least 3 to continue" : "you're good to go"
                        }`}
                    {step === 2 && (obDiets.size > 0 ? `${obDiets.size} dietary prefs selected` : "Skip if none apply")}
                    {step === 3 && (obChefs.size > 0 ? `${obChefs.size} chefs selected` : "Skip if you'd like")}
                </span>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button className="btn-ob btn-ob-skip" onClick={finishOnboarding}>
                        Skip all
                    </button>
                    {step > 1 && (
                        <button className="btn-ob btn-ob-back" onClick={() => setStep(step - 1)}>
                            ← Back
                        </button>
                    )}
                    <button
                        className="btn-ob"
                        disabled={step === 1 && obStyles.size < 3}
                        onClick={handleNext}
                    >
                        {step === 3 ? "Go to Dashboard →" : "Continue →"}
                    </button>
                </div>
            </div>
        </div>
    );
}
