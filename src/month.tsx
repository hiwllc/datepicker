import { Grid, Box, Heading, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { format, isSameDay } from 'date-fns'
import { eachDayOfInterval } from 'date-fns/esm'
import type { CalendarValues, CalendarDate } from './types'
import { Day } from './day'

export type Month = {
  date: CalendarDate
  days: (CalendarDate | null)[]
  values?: CalendarValues
  startSelectedDate?: CalendarDate
  endSelectedDate?: CalendarDate
  onSelectDate: (date: CalendarDate) => void
}

export function Month({
  date,
  days,
  values,
  startSelectedDate,
  endSelectedDate,
  onSelectDate,
}: Month) {
  const styles = useMultiStyleConfig('CalendarMonth', {})

  return (
    <Box>
      <Heading sx={styles.name}>{format(date, 'MMMM, yyyy')}</Heading>

      <Grid sx={styles.week}>
        <Text sx={styles.weekday}>Sun</Text>
        <Text sx={styles.weekday}>Mon</Text>
        <Text sx={styles.weekday}>Tue</Text>
        <Text sx={styles.weekday}>Wed</Text>
        <Text sx={styles.weekday}>Thu</Text>
        <Text sx={styles.weekday}>Fri</Text>
        <Text sx={styles.weekday}>Sat</Text>
      </Grid>

      <Grid sx={styles.days}>
        {days.map((day, index) => {
          if (!day) {
            return <span key={`not-a-day-${index}`} />
          }

          let variant: 'selected' | 'range' | undefined

          const isSelected =
            (startSelectedDate && isSameDay(day, startSelectedDate)) ||
            (endSelectedDate && isSameDay(day, endSelectedDate))

          if (isSelected) {
            variant = 'selected'
          }

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

          if (isInRange && !isSelected) {
            variant = 'range'
          }

          return (
            <Day
              variant={variant}
              day={day}
              key={format(day, 'd-M')}
              onSelectDate={onSelectDate}
            />
          )
        })}
      </Grid>
    </Box>
  )
}
