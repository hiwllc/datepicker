import * as React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../src/theme'

const Providers = ({ children }: React.PropsWithChildren<unknown>) => <ChakraProvider theme={theme}>{children}</ChakraProvider>

const renderer = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'
export { renderer as render }
