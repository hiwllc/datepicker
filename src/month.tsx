import { Grid, Box, Heading, Text, Button } from '@chakra-ui/react'
import { format } from 'date-fns'
import type { CalendarDate } from './useCalendar'

export type Month = {
  date: CalendarDate
  days: (CalendarDate | null)[]
}

export function Month({ date, days }: Month) {
  return (
    <Box>
      <Heading
        h="32px"
        textAlign="center"
        as="h2"
        lineHeight="32px"
        fontSize="md"
      >
        {format(date, 'MMMM, yyyy')}
      </Heading>

      <Grid gridTemplateColumns="repeat(7, 1fr)">
        <Text textAlign="center">Sun</Text>
        <Text textAlign="center">Mon</Text>
        <Text textAlign="center">Tue</Text>
        <Text textAlign="center">Wed</Text>
        <Text textAlign="center">Thu</Text>
        <Text textAlign="center">Fri</Text>
        <Text textAlign="center">Sat</Text>
      </Grid>

      <Grid gap={1} gridTemplateColumns="repeat(7, 1fr)">
        {days.map(day => {
          if (!day) {
            return <span />
          }

          return (
            <Button variant="ghost" size="sm" key={format(day, 'd-M')}>
              {format(day, 'dd')}
            </Button>
          )
        })}
      </Grid>
    </Box>
  )
}
