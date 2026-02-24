-- 1. Insert existing users from auth.users into public.chefs
INSERT INTO public.chefs (id, name, emoji, specialty, followers, bio)
SELECT 
    id::text, 
    COALESCE(raw_user_meta_data->>'full_name', 'New Chef'), 
    '👨‍🍳', 
    'Home Cook', 
    0, 
    'Passionate home cook'
FROM auth.users
WHERE NOT EXISTS (
    SELECT 1 FROM public.chefs WHERE chefs.id = auth.users.id::text
);

-- 2. Create a trigger function to handle new signups
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.chefs (id, name, emoji, specialty, followers, bio)
  VALUES (
    NEW.id::text,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Chef'),
    '👨‍🍳',
    'Home Cook',
    0,
    'Passionate home cook'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
