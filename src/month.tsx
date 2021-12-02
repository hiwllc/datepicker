import { Grid, Box, Heading, Text, useMultiStyleConfig } from '@chakra-ui/react'
import {
  addDays,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isWeekend,
  Locale,
  startOfMonth,
  startOfWeek,
  eachDayOfInterval,
} from 'date-fns'
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
  disablePastDates?: boolean
  disableFutureDates?: boolean
  disableWeekends?: boolean
  disableDates?: CalendarDate[]
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
  disablePastDates,
  disableFutureDates,
  disableWeekends,
  disableDates,
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

          let variant: 'selected' | 'range' | 'outside' | undefined

          const isSelected =
            (startSelectedDate && isSameDay(day, startSelectedDate)) ||
            (endSelectedDate && isSameDay(day, endSelectedDate))

          if (isSelected) {
            variant = 'selected'
          }

          if (
            (isBefore(day, startOfMonth(date)) ||
              isAfter(day, endOfMonth(date))) &&
            !isSelected
          ) {
            variant = 'outside'
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
            (disablePastDates && isBefore(day, new Date())) ||
            (disableFutureDates && isAfter(day, new Date())) ||
            (disableWeekends && isWeekend(day)) ||
            (disableDates && disableDates.some(date => isSameDay(day, date)))

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
