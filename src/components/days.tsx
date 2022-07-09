import * as React from 'react'
import { Button, Grid } from '@chakra-ui/react'
import { format, getDay } from 'date-fns'
import { MonthContext } from './month'

export function CalendarMonthDays() {
  const { days } = React.useContext(MonthContext)

  return (
    <Grid gridTemplateColumns="repeat(7, 1fr)">
      {days.map(day => (
        <Button
          size="sm"
          variant="ghost"
          textAlign="center"
          key={format(day, 'd-M')}
        >
          {format(day, 'd')}
        </Button>
      ))}
    </Grid>
  )
}
