-- Create CHEFS table
CREATE TABLE IF NOT EXISTS chefs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    emoji TEXT NOT NULL,
    specialty TEXT NOT NULL,
    followers INTEGER NOT NULL,
    bio TEXT NOT NULL
);

-- Create COOKING_STYLES table
CREATE TABLE IF NOT EXISTS cooking_styles (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    icon TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- Create DIETS table
CREATE TABLE IF NOT EXISTS diets (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    icon TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- Create RECIPES table
CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    chefId TEXT REFERENCES chefs(id),
    difficulty TEXT NOT NULL,
    time INTEGER NOT NULL,
    rating NUMERIC NOT NULL,
    likes INTEGER NOT NULL,
    styles TEXT[] NOT NULL,
    cuisine TEXT NOT NULL,
    ingredients TEXT[] NOT NULL,
    steps TEXT[] NOT NULL
);

-- Disable Row Level Security (RLS) for public access for seeding
-- Note: In a production app, you should enable RLS and set proper policies
ALTER TABLE chefs DISABLE ROW LEVEL SECURITY;
ALTER TABLE cooking_styles DISABLE ROW LEVEL SECURITY;
ALTER TABLE diets DISABLE ROW LEVEL SECURITY;
ALTER TABLE recipes DISABLE ROW LEVEL SECURITY;
