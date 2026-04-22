import '../client/src/index.css';
import React from 'react';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: 'oklch(0.141 0.005 285.823)' },
        { name: 'light', value: 'oklch(0.98 0.001 286.375)' },
      ],
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        { className: 'dark min-h-screen bg-background p-8' },
        React.createElement(Story),
      ),
  ],
};

export default preview;