import { Grid } from '@chakra-ui/react'
import { Months, useCalendarContext } from './provider'

type CalendarMonths = {
  children: ({ months }: { months: Months }) => JSX.Element
}

export function CalendarMonths({ children }: CalendarMonths) {
  const { months } = useCalendarContext()

  return (
    <Grid w="100%" gridTemplateColumns={`repeat(${months.length}, 1fr)`}>
      {children({ months })}
    </Grid>
  )
}
