import React, {useState, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {pokemonFormSchema, PokemonFormData} from '../../utils/validators';
import {usePokemon} from '../../hooks/usePokemon';
import {Pokemon} from '../../types/pokemon';
import {Select} from "../Select/Select.tsx";
import {Modal} from '../Modal/Modal.tsx';

interface PokemonOption {
    value: string;
    label: string;
    image?: string;
}

export const PokemonForm: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [pokemonOptions, setPokemonOptions] = useState<PokemonOption[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<Pokemon[]>([]);

    const {pokemonList, loading, getPokemonDetails} = usePokemon();

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
        watch,
    } = useForm<PokemonFormData>({
        resolver: zodResolver(pokemonFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            pokemonTeam: [],
        },
    });

    useEffect(() => {
        if (pokemonList.length > 0) {
            const options = pokemonList.map((pokemon) => {
                const id = pokemon.url.split('/').filter(Boolean).pop();
                return {
                    value: pokemon.name,
                    label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                };
            });
            setPokemonOptions(options);
        }
    }, [pokemonList]);

    const pokemonTeam = watch('pokemonTeam');

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            if (pokemonTeam && pokemonTeam.length > 0) {
                try {
                    const detailsPromises = pokemonTeam.map((pokemon: PokemonOption) =>
                        getPokemonDetails(pokemon.value)
                    );
                    const details = await Promise.all(detailsPromises);
                    setSelectedPokemonDetails(details);
                } catch (err) {
                    console.error('Error fetching Pokemon details:', err);
                }
            } else {
                setSelectedPokemonDetails([]);
            }
        };

        fetchPokemonDetails();
    }, [pokemonTeam, getPokemonDetails]);

    const onSubmit = async () => {
        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setShowModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getTypeColor = (type: string) => {
        const typeColors: Record<string, string> = {
            normal: 'bg-gray-400',
            fire: 'bg-red-500',
            water: 'bg-blue-500',
            electric: 'bg-yellow-400',
            grass: 'bg-green-500',
            ice: 'bg-blue-200',
            fighting: 'bg-red-700',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            flying: 'bg-indigo-300',
            psychic: 'bg-pink-500',
            bug: 'bg-lime-500',
            rock: 'bg-yellow-800',
            ghost: 'bg-purple-700',
            dragon: 'bg-indigo-600',
            dark: 'bg-gray-800',
            steel: 'bg-gray-500',
            fairy: 'bg-pink-300',
        };

        return typeColors[type] || 'bg-gray-400';
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Pokémon Registration</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">

                        <div>
                            <label htmlFor="firstName" className="block mb-1 font-medium">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Enter your first  name"
                                className={`
                  w-full px-3 py-2 border rounded-lg
                  ${errors.firstName ? 'border-luna-error' : 'border-gray-300'}
                `}
                                {...register('firstName')}
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-sm text-luna-error">{errors.firstName.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block mb-1 font-medium">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Enter your last name"
                                className={`
                  w-full px-3 py-2 border rounded-lg
                  ${errors.lastName ? 'border-luna-error' : 'border-gray-300'}
                `}
                                {...register('lastName')}
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-sm text-luna-error">{errors.lastName.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="pokemonTeam" className="block mb-1 font-medium">
                                Select Your Team (4 Pokémon)
                            </label>
                            <Controller
                                name="pokemonTeam"
                                control={control}
                                render={({field}) => (
                                    <Select
                                        options={pokemonOptions}
                                        value={field.value || []}
                                        onChange={field.onChange}
                                        placeholder="Search for Pokémon..."
                                        maxSelections={4}
                                        isLoading={loading}
                                        error={errors.pokemonTeam?.message}
                                        className="w-full"
                                    />
                                )}
                            />
                            {errors.pokemonTeam && (
                                <p className="mt-1 text-sm text-luna-error">{errors.pokemonTeam.message}</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`
                  w-full py-2 px-4 rounded-lg text-white font-medium
                  ${isSubmitting ? 'bg-luna-primary/70' : 'bg-luna-primary hover:bg-luna-secondary'}
                  transition-colors
                `}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Submitting...
                                    </div>
                                ) : (
                                    'View My Team'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Your Pokémon Team"
            >
                <div className="space-y-4">
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-medium">
                            Trainer: {watch('firstName')} {watch('lastName')}
                        </h3>
                        <p className="text-gray-600">Ready for Battle!</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {selectedPokemonDetails.map((pokemon) => (
                            <div
                                key={pokemon.id}
                                className="bg-white border rounded-lg p-3 flex flex-col items-center"
                            >
                                <img
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    className="w-20 h-20"
                                />
                                <h4 className="font-medium capitalize">
                                    {pokemon.name}
                                </h4>
                                <div className="flex gap-1 mt-1">
                                    {pokemon.types.map((typeInfo) => (
                                        <span
                                            key={typeInfo.type.name}
                                            className={`
                        ${getTypeColor(typeInfo.type.name)}
                        text-white text-xs px-2 py-1 rounded-full capitalize
                      `}
                                        >
                      {typeInfo.type.name}
                    </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 text-center">
                        <button
                            type="button"
                            className="py-2 px-6 bg-luna-primary hover:bg-luna-secondary text-white rounded-lg transition-colors"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

