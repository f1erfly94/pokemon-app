import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming';
import '../src/index.css'; // Import your Tailwind CSS file

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        docs: {
            theme: themes.light,
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#f9fafb',
                },
                {
                    name: 'dark',
                    value: '#1f2937',
                },
            ],
        },
    },
};