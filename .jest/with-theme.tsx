import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../src/theme'
import { PropsWithChildren, ReactElement } from 'react'

const Providers = ({ children }: PropsWithChildren<unknown>) => <ChakraProvider theme={theme}>{children}</ChakraProvider>

const renderer = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'
export { renderer as render }
