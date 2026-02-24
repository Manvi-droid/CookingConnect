import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useSupabaseData() {
    const [recipes, setRecipes] = useState<any[]>([])
    const [chefs, setChefs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClient()

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)

                const [recipesRes, chefsRes] = await Promise.all([
                    supabase.from('recipes').select('*').order('id', { ascending: false }),
                    supabase.from('chefs').select('*')
                ])

                if (recipesRes.error) throw recipesRes.error
                if (chefsRes.error) throw chefsRes.error

                setRecipes(recipesRes.data || [])
                setChefs(chefsRes.data || [])
            } catch (err: any) {
                // Ignore AuthSessionMissingError as it's common during auth transitions or public routes
                if (err?.name !== 'AuthSessionMissingError') {
                    console.error('Error fetching data from Supabase:', err)
                }
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { recipes, chefs, loading, error, setRecipes, setChefs }
}
