import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
    theme: {
        ...themes.dark,
        brandTitle: 'Luna Edge Pokémon Trainer',
        brandUrl: 'https://lunaedge.com',
        brandImage: '/src/assets/logo.svg',
        brandTarget: '_self',
        colorPrimary: '#6366f1',
        colorSecondary: '#4f46e5',
        appBg: '#1e1e1e',
        appContentBg: '#2d2d2d',
        appBorderColor: '#444444',
        appBorderRadius: 6,
    },
});