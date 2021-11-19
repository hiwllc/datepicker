import { Grid, Box, Heading, Text, useMultiStyleConfig } from '@chakra-ui/react'
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isSameDay,
  Locale,
  startOfWeek,
} from 'date-fns'
import { eachDayOfInterval } from 'date-fns/esm'
import type { CalendarValues, CalendarDate } from './types'
import { Day } from './day'

export type Month = {
  date: CalendarDate
  days: (CalendarDate | null)[]
  value?: CalendarValues
  startSelectedDate?: CalendarDate
  endSelectedDate?: CalendarDate
  locale?: Locale
  monthYearFormat: string
  weekdayFormat: string
  blockPastDates?: boolean
  blockFutureDates?: boolean
  blockDates?: CalendarDate[]
  onSelectDate: (date: CalendarDate) => void
}

function weekdays(weekdayFormat: string, locale?: Locale) {
  const start = startOfWeek(new Date())
  return [...Array(7).keys()].map(i =>
    format(addDays(start, i), weekdayFormat, { locale })
  )
}

export function Month({
  date,
  days,
  value,
  startSelectedDate,
  endSelectedDate,
  locale,
  monthYearFormat,
  weekdayFormat,
  blockPastDates,
  blockFutureDates,
  blockDates,
  onSelectDate,
}: Month) {
  const styles = useMultiStyleConfig('CalendarMonth', {})
  const week = weekdays(weekdayFormat, locale)

  return (
    <Box sx={styles.month}>
      <Heading sx={styles.name}>
        {format(date, monthYearFormat, { locale })}
      </Heading>

      <Grid sx={styles.week}>
        {week.map(weekday => (
          <Text key={weekday} sx={styles.weekday}>
            {weekday}
          </Text>
        ))}
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
            value?.start &&
            value.end &&
            eachDayOfInterval({
              start: value?.start as CalendarDate,
              end: value?.end as CalendarDate,
            })

          const isInRange = interval
            ? interval.some(date => isSameDay(day, date))
            : false

          if (isInRange && !isSelected) {
            variant = 'range'
          }

          const isDisabled =
            (blockPastDates && isBefore(day, new Date())) ||
            (blockFutureDates && isAfter(day, new Date())) ||
            (blockDates && blockDates.some(date => isSameDay(day, date)))

          return (
            <Day
              variant={variant}
              day={day}
              key={format(day, 'd-M')}
              disabled={isDisabled}
              onSelectDate={onSelectDate}
            />
          )
        })}
      </Grid>
    </Box>
  )
}
