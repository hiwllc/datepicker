import * as React from 'react'
import type { GridProps } from '@chakra-ui/react'
import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarStyles } from './types'

export type CalendarMonths = React.PropsWithChildren<GridProps>

export function CalendarMonths({ children, ...props }: CalendarMonths) {
  const styles = useMultiStyleConfig('Calendar', {}) as CalendarStyles

  return <Grid sx={{ ...styles.months, ...props }}>{children}</Grid>
}
