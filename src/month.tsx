import { Grid, Box, Heading, Text } from '@chakra-ui/react'
import { format, isSameDay } from 'date-fns'
import { eachDayOfInterval } from 'date-fns/esm'
import { Day } from './day'
import type { CalendarDate } from './useCalendar'

export type Month = {
  date: CalendarDate
  days: (CalendarDate | null)[]
  values?: { start?: CalendarDate; end?: CalendarDate }
  startSelectedDate?: CalendarDate
  endSelectedDate?: CalendarDate
}

export function Month({
  date,
  days,
  values,
  startSelectedDate,
  endSelectedDate,
}: Month) {
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

      <Grid gridTemplateColumns="repeat(7, 1fr)">
        {days.map((day, index) => {
          if (!day) {
            return <span key={`not-a-day-${index}`} />
          }

          const isSelected = Boolean(
            (startSelectedDate && isSameDay(day, startSelectedDate)) ||
              (endSelectedDate && isSameDay(day, endSelectedDate))
          )

          const interval =
            values?.start &&
            values.end &&
            eachDayOfInterval({
              start: values?.start as CalendarDate,
              end: values?.end as CalendarDate,
            })

          const isInRange = interval
            ? interval.some(date => isSameDay(day, date))
            : false

          return (
            <Day
              isSelected={isSelected}
              isInRange={isInRange}
              day={day}
              key={format(day, 'd-M')}
              onSelectDate={() => null}
            />
          )
        })}
      </Grid>
    </Box>
  )
}
