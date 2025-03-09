import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {Select} from './Select';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# Select Component

The Select component allows users to select one or multiple options from a dropdown list.
It supports searching, custom rendering, and multi-selection with limits.

## Features

- **Multi-selection**: Select multiple items with optional limit
- **Search**: Filter options as you type
- **Custom rendering**: Display images and custom content
- **Accessibility**: Keyboard navigation and ARIA attributes
- **Validation**: Display error states
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        options: {
            description: 'Array of options to display in the dropdown',
            control: 'object'
        },
        value: {
            description: 'Currently selected option(s)',
            control: 'object'
        },
        onChange: {
            description: 'Callback when selection changes',
            action: 'changed'
        },
        placeholder: {
            description: 'Text to display when no option is selected',
            control: 'text'
        },
        maxSelections: {
            description: 'Maximum number of items that can be selected',
            control: { type: 'number', min: 1 }
        },
        isLoading: {
            description: 'Display a loading indicator',
            control: 'boolean'
        },
        disabled: {
            description: 'Disable the select component',
            control: 'boolean'
        },
        error: {
            description: 'Error message to display',
            control: 'text'
        },
        className: {
            description: 'Additional CSS classes',
            control: 'text'
        }
    }
};

export default meta;
type Story = StoryObj<typeof Select>;

// Mock data for the stories
const pokemonOptions = [
    { value: 'bulbasaur', label: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { value: 'charmander', label: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
    { value: 'squirtle', label: 'Squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
    { value: 'pikachu', label: 'Pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    { value: 'jigglypuff', label: 'Jigglypuff', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' },
    { value: 'meowth', label: 'Meowth', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png' },
    { value: 'psyduck', label: 'Psyduck', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png' },
    { value: 'gengar', label: 'Gengar', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
    { value: 'eevee', label: 'Eevee', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
    { value: 'snorlax', label: 'Snorlax', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' }
];

// @ts-ignore
const SelectTemplate = (args) => {
    const [selectedOptions, setSelectedOptions] = useState(args.value || []);

    return (
        <div className="w-80">
            <Select
                {...args}
                value={selectedOptions}
                onChange={setSelectedOptions}
            />
        </div>
    );
};

export const Default: Story = {
    render: SelectTemplate,
    args: {
        options: pokemonOptions,
        value: [],
        placeholder: 'Select Pokemon',
        maxSelections: Infinity,
        isLoading: false,
        disabled: false,
        error: undefined,
        className: ''
    }
};

export const WithPreselectedOptions: Story = {
    render: SelectTemplate,
    args: {
        options: pokemonOptions,
        value: [pokemonOptions[0], pokemonOptions[3]],
        placeholder: 'Select Pokemon',
        maxSelections: Infinity,
        isLoading: false,
        disabled: false,
        error: undefined,
        className: ''
    }
};

export const WithMaxSelections: Story = {
    render: SelectTemplate,
    args: {
        options: pokemonOptions,
        value: [],
        placeholder: 'Select up to 4 Pokemon',
        maxSelections: 4,
        isLoading: false,
        disabled: false,
        error: undefined,
        className: ''
    }
};

export const WithLoading: Story = {
    render: SelectTemplate,
    args: {
        options: pokemonOptions,
        value: [],
        placeholder: 'Loading Pokemon...',
        maxSelections: Infinity,
        isLoading: true,
        disabled: false,
        error: undefined,
        className: ''
    }
};

export const Disabled: Story = {
    render: SelectTemplate,
    args: {
        options: pokemonOptions,
        value: [],
        placeholder: 'Select is disabled',
        maxSelections: Infinity,
        isLoading: false,
        disabled: true,
        error: undefined,
        className: ''
    }
};

export const WithError: Story = {
    render: SelectTemplate,
    args: {
        options: pokemonOptions,
        value: [],
        placeholder: 'Select Pokemon',
        maxSelections: 4,
        isLoading: false,
        disabled: false,
        error: 'You must select exactly 4 Pokemon',
        className: ''
    }
};