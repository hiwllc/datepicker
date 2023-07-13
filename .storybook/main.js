module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/newDP/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@chakra-ui/storybook-addon'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': '@emotion/react',
      'emotion-theming': '@emotion/react'
    };
    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  }
};