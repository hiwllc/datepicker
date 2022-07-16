import * as React from 'react'
import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { useCalendarContext } from '../providers/calendar'

export function CalendarMonths({ children }: React.PropsWithChildren<unknown>) {
  const { months } = useCalendarContext()
  const styles = useMultiStyleConfig('CalendarMonth', {})

  return (
    <Grid
      gridTemplateColumns={`repeat(${months.length}, 1fr)`}
      sx={styles.months}
    >
      {children}
    </Grid>
  )
}
