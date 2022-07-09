import * as React from 'react'
import { Flex } from '@chakra-ui/react'

export function CalendarHeader({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Flex
      gridRowStart={1}
      gridColumnStart={1}
      justifyContent="space-between"
      w="100%"
    >
      {children}
    </Flex>
  )
}
