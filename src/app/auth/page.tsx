"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthPage() {
    const { login, signup } = useAppContext();
    const router = useRouter();

    const [authMode, setAuthMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleAuth = async () => {
        setErrorMsg("");

        if (!email.trim() || !password) {
            setErrorMsg("Please fill in email and password");
            return;
        }

        const supabase = createClient();

        if (authMode === "signup") {
            if (!name.trim() || !username.trim()) {
                setErrorMsg("Please fill in all fields");
                return;
            }
            if (password.length < 6) {
                setErrorMsg("Password needs at least 6 characters");
                return;
            }

            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        username: username,
                        bio: bio
                    }
                }
            });

            if (error) {
                setErrorMsg(error.message);
                return;
            }

            signup(email, password, name, username, bio);
            router.push("/onboarding");
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                if (error.message.includes("Invalid login credentials")) {
                    setAuthMode("signup");
                    setErrorMsg("Account not found or incorrect password. Please sign up to continue.");
                } else {
                    setErrorMsg(error.message);
                }
                return;
            }

            login(email, password);
            router.push("/");
        }
    };

    return (
        <div className="screen-auth screen active">
            <div className="auth-wrap">
                <div className="auth-hero">
                    <img
                        src="https://i.pinimg.com/1200x/13/7e/8a/137e8a47e99538877cdae9dc84aab14d.jpg"
                        alt="Family cooking"
                        className="auth-hero-img"
                    />
                    <div className="auth-hero-overlay">
                        <div className="brand auth-brand">🍳 RecipeConnect</div>
                        <blockquote className="auth-quote">
                            "Great cooking is about love,<br />creativity, and a pinch of daring."
                        </blockquote>
                    </div>
                </div>
                <div className="auth-right">
                    <div className="auth-box">
                        <h2 id="auth-heading">
                            {authMode === "login" ? "Welcome back 👋" : "Join the kitchen 👋"}
                        </h2>
                        <p id="auth-sub">
                            {authMode === "login"
                                ? "Sign in to continue your culinary journey"
                                : "Join thousands of passionate cooks"}
                        </p>

                        <div className="auth-tabs">
                            <button
                                className={`auth-tab ${authMode === "login" ? "active" : ""}`}
                                onClick={() => { setAuthMode("login"); setErrorMsg(""); }}
                            >
                                Sign In
                            </button>
                            <button
                                className={`auth-tab ${authMode === "signup" ? "active" : ""}`}
                                onClick={() => { setAuthMode("signup"); setErrorMsg(""); }}
                            >
                                Sign Up
                            </button>
                        </div>

                        {errorMsg && <div className="err-msg">⚠️ {errorMsg}</div>}

                        {authMode === "signup" && (
                            <div id="signup-extra">
                                <div className="field-group">
                                    <label>FULL NAME</label>
                                    <input
                                        placeholder="Gordon Ramsay"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="field-group">
                                    <label>USERNAME</label>
                                    <input
                                        placeholder="chef_gordon"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="field-group">
                                    <label>BIO (optional)</label>
                                    <input
                                        placeholder="Passionate home cook from Mumbai…"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="field-group">
                            <label>EMAIL</label>
                            <input
                                type="email"
                                placeholder="chef@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                            />
                        </div>
                        <div className="field-group">
                            <label>PASSWORD</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                            />
                        </div>

                        <button className="btn-primary" onClick={handleAuth}>
                            {authMode === "login" ? "Sign In →" : "Create Account →"}
                        </button>

                        <p className="auth-switch">
                            {authMode === "login" ? "New here? " : "Already have an account? "}
                            <span onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
                                {authMode === "login" ? "Create an account" : "Sign in instead"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
