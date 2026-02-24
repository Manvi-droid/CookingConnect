"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface State {
    username: string;
    displayName: string;
    bio: string;
    avatar: string;
    isNewUser: boolean;

    userStyles: string[];
    userDiets: string[];

    follows: Record<string, boolean>;
    followDelta: Record<string, number>;

    likes: Record<number, boolean>;
    likeCounts: Record<number, number>;
    saved: Record<number, boolean>;

    folders: { id: string; name: string; recipeIds: number[] }[];
}

const initialState: State = {
    username: "",
    displayName: "",
    bio: "",
    avatar: "👨‍🍳",
    isNewUser: false,

    userStyles: [],
    userDiets: [],

    follows: {},
    followDelta: {},

    likes: {},
    likeCounts: {},
    saved: {},
    folders: [],
};

interface AppContextType {
    state: State;
    setState: React.Dispatch<React.SetStateAction<State>>;
    doLike: (recipeId: number, baseLikes: number) => void;
    doSave: (recipeId: number) => void;
    doFollow: (chefId: string) => void;
    login: (email: string, pass: string) => void;
    signup: (email: string, pass: string, name: string, user: string, bio: string) => void;
    logout: () => void;
    updatePrefs: (styles: string[], diets: string[]) => void;
    updateProfile: (displayName: string, username: string, bio: string, avatar: string) => void;

    createFolder: (name: string) => void;
    deleteFolder: (folderId: string) => void;
    toggleRecipeInFolder: (recipeId: number, folderId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<State>(initialState);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem("cooking_connect_state");
        if (savedState) {
            try {
                setState(JSON.parse(savedState));
            } catch (e) {
                console.error("Failed to parse state from localStorage", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save state to localStorage strings
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cooking_connect_state", JSON.stringify(state));
        }
    }, [state, isLoaded]);

    const doLike = (recipeId: number, baseLikes: number) => {
        setState((prev) => {
            const wasLiked = !!prev.likes[recipeId];
            const prevCount = prev.likeCounts[recipeId] ?? baseLikes;
            return {
                ...prev,
                likes: { ...prev.likes, [recipeId]: !wasLiked },
                likeCounts: { ...prev.likeCounts, [recipeId]: wasLiked ? prevCount - 1 : prevCount + 1 },
            };
        });
    };

    const doSave = (recipeId: number) => {
        setState((prev) => ({
            ...prev,
            saved: { ...prev.saved, [recipeId]: !prev.saved[recipeId] },
        }));
    };

    const doFollow = (chefId: string) => {
        setState((prev) => {
            const wasFollowing = !!prev.follows[chefId];
            const delta = (prev.followDelta[chefId] || 0) + (wasFollowing ? -1 : 1);
            return {
                ...prev,
                follows: { ...prev.follows, [chefId]: !wasFollowing },
                followDelta: { ...prev.followDelta, [chefId]: delta },
            };
        });
    };

    const login = (email: string, pass: string) => {
        setState((prev) => ({
            ...prev,
            displayName: email.split("@")[0],
            username: email.split("@")[0],
            bio: "Passionate home cook",
            avatar: "👨‍🍳",
            isNewUser: false,
        }));
    };

    const signup = (email: string, pass: string, name: string, user: string, bio: string) => {
        setState((prev) => ({
            ...prev,
            displayName: name,
            username: user,
            bio: bio || "Passionate home cook",
            avatar: "👨‍🍳",
            isNewUser: true,
        }));
    };

    const logout = () => {
        setState(initialState);
        localStorage.removeItem("cooking_connect_state");
    };

    const updatePrefs = (styles: string[], diets: string[]) => {
        setState((prev) => ({ ...prev, userStyles: styles, userDiets: diets }));
    };

    const updateProfile = (displayName: string, username: string, bio: string, avatar: string) => {
        setState((prev) => ({ ...prev, displayName, username, bio, avatar }));
    };

    const createFolder = (name: string) => {
        const newFolder = { id: Date.now().toString(), name, recipeIds: [] };
        setState((prev) => ({ ...prev, folders: [...(prev.folders || []), newFolder] }));
    };

    const deleteFolder = (folderId: string) => {
        setState((prev) => ({
            ...prev,
            folders: prev.folders.filter((f) => f.id !== folderId),
        }));
    };

    const toggleRecipeInFolder = (recipeId: number, folderId: string) => {
        setState((prev) => {
            const nextFolders = prev.folders.map((f) => {
                if (f.id === folderId) {
                    const hasRecipe = f.recipeIds.includes(recipeId);
                    return {
                        ...f,
                        recipeIds: hasRecipe
                            ? f.recipeIds.filter(id => id !== recipeId)
                            : [...f.recipeIds, recipeId]
                    };
                }
                return f;
            });

            // We also make sure it exists in the main `saved` record
            const nextSaved = { ...prev.saved };
            // Auto save if we add it to a folder and it wasn't saved
            const isAddedAnywhere = nextFolders.some(f => f.recipeIds.includes(recipeId));
            if (isAddedAnywhere) {
                nextSaved[recipeId] = true;
            }

            return { ...prev, folders: nextFolders, saved: nextSaved };
        });
    };

    if (!isLoaded) return null; // Avoid hydration mismatch

    return (
        <AppContext.Provider
            value={{
                state, setState, doLike, doSave, doFollow, login, signup, logout,
                updatePrefs, updateProfile, createFolder, deleteFolder, toggleRecipeInFolder
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}
