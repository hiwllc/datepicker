import { Button, Grid } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useMonthContext } from '../hooks/use-month'

export function CalendarMonthDays() {
  const { days } = useMonthContext()

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
