import * as React from 'react'
import { Flex, useStyleConfig } from '@chakra-ui/react'

export function CalendarHeader({ children }: React.PropsWithChildren<unknown>) {
  const style = useStyleConfig('CalendarHeader')
  return <Flex sx={style}>{children}</Flex>
}
