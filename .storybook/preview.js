import { ChakraProvider, ThemeProvider } from '@chakra-ui/react'
import { theme } from '../src/theme'

export const decorators = [
  (Story) => (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </ChakraProvider>
  )
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
