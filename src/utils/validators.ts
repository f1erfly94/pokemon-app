import { z } from 'zod';

export const pokemonFormSchema = z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(12, 'First name must be at most 12 characters')
        .regex(/^[a-zA-Z]+$/, 'Only letters (a-z, A-Z) are allowed'),
    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(12, 'Last name must be at most 12 characters')
        .regex(/^[a-zA-Z]+$/, 'Only letters (a-z, A-Z) are allowed'),
    pokemonTeam: z
        .array(z.any())
        .min(4, 'You must select exactly 4 Pokemon')
        .max(4, 'You must select exactly 4 Pokemon'),
});

export type PokemonFormData = z.infer<typeof pokemonFormSchema>;