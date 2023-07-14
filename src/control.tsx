import * as React from 'react'
import { Flex, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarControlStyles } from './types'

export type CalendarControlsProps = React.PropsWithChildren<unknown>

export function CalendarControls({ children }: CalendarControlsProps) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles

  return <Flex sx={styles.controls}>{children}</Flex>
}
