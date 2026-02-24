"use client";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CHEFS } from "@/lib/data";

interface SidebarProps {
    onOpenChefPanel: (chefId: string) => void;
}

export function Sidebar({ onOpenChefPanel }: SidebarProps) {
    const { state, logout } = useAppContext();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/auth");
    };

    const followedChefs = CHEFS.filter((c) => state.follows[c.id]);

    const navItems = [
        { page: "/", label: "Home", icon: "🏠" },
        { page: "/chefs", label: "Chefs", icon: "👨‍🍳" },
        { page: "/saved", label: "Saved", icon: "🔖" },
        { page: "/create", label: "Create", icon: "✏️" },
        { page: "/prefs", label: "My Tastes", icon: "🎨" },
        { page: "/profile", label: "My Profile", icon: "👤" },
    ];

    return (
        <aside className="sidebar">
            <div className="sb-brand brand">🍳 RecipeConnect</div>
            <nav className="sb-section">
                <div className="sb-label">MENU</div>
                {navItems.map((item) => (
                    <Link
                        key={item.page}
                        href={item.page}
                        className={`sb-item ${pathname === item.page ? "active" : ""}`}
                    >
                        <span className="sb-icon">{item.icon}</span> {item.label}
                    </Link>
                ))}
                <div className="sb-divider"></div>
                <div className="sb-item sb-logout" onClick={handleLogout}>
                    <span className="sb-icon">🚪</span> Logout
                </div>
            </nav>
            {followedChefs.length > 0 && (
                <div className="sb-following">
                    <div className="sb-label">FOLLOWING</div>
                    <div>
                        {followedChefs.map((c) => (
                            <div
                                key={c.id}
                                className="sb-chef"
                                onClick={() => onOpenChefPanel(c.id)}
                            >
                                <div className="sb-chef-av">{c.emoji}</div>
                                <div className="sb-chef-name">{c.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}
