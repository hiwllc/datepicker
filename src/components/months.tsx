import * as React from 'react'
import { Grid } from '@chakra-ui/react'
import { useCalendarContext } from './provider'

export function CalendarMonths({ children }: React.PropsWithChildren<unknown>) {
  const { months } = useCalendarContext()

  return (
    <Grid w="100%" gridTemplateColumns={`repeat(${months.length}, 1fr)`}>
      {children}
    </Grid>
  )
}
