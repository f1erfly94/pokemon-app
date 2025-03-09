import axios from 'axios';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 151, offset = 0): Promise<PokemonListResponse> => {
    const response = await axios.get<PokemonListResponse>(`${API_URL}/pokemon`, {
        params: {
            limit,
            offset,
        },
    });
    return response.data;
};

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
    const response = await axios.get<Pokemon>(`${API_URL}/pokemon/${name}`);
    return response.data;
};

export const getPokemonDetails = async (url: string): Promise<Pokemon> => {
    const response = await axios.get<Pokemon>(url);
    return response.data;
};