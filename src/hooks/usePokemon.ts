import { useState, useEffect } from 'react';
import { getPokemonList, getPokemonByName } from '../services/pokemonService';
import { Pokemon, PokemonListItem } from '../types/pokemon';

export const usePokemon = () => {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                setLoading(true);
                const data = await getPokemonList(151);
                setPokemonList(data.results);
                setError(null);
            } catch (err) {
                setError('Failed to fetch Pokemon list. Please try again later.');
                console.error('Error fetching Pokemon list:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, []);

    const getPokemonDetails = async (name: string): Promise<Pokemon> => {
        try {
            return await getPokemonByName(name);
        } catch (err) {
            console.error(`Error fetching details for Pokemon ${name}:`, err);
            throw new Error(`Failed to fetch details for Pokemon ${name}`);
        }
    };

    return {
        pokemonList,
        loading,
        error,
        getPokemonDetails,
    };
};