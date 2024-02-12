import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@chakra-ui/storybook-addon',
  ],
  webpackFinal: async config => {
    config?.module?.rules?.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })

    if (config.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@emotion/core': '@emotion/react',
        'emotion-theming': '@emotion/react',
      }
    }

    return config
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { builder: { useSWC: true } },
  },
  docs: {
    autodocs: true,
  },
}
export default config
