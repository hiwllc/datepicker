import { Grid, Text } from '@chakra-ui/react'
import { addDays, format, startOfWeek } from 'date-fns'

function getWeek() {
  const start = startOfWeek(new Date())
  return [...Array(7).keys()].map(i => format(addDays(start, i), 'E'))
}

export function CalendarWeek() {
  const week = getWeek()

  return (
    <Grid py={2} gridArea="week" gridTemplateColumns="repeat(7, 1fr)">
      {week.map(day => (
        <Text textAlign="center" key={day} color="gray.500">
          {day}
        </Text>
      ))}
    </Grid>
  )
}
