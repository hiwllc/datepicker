import * as React from 'react'
import { Grid, useMultiStyleConfig } from '@chakra-ui/react'
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isWeekend,
  startOfMonth,
} from 'date-fns'
import type { CalendarMonthStyles } from './types'
import { CalendarContext } from './context'
import { Day } from './day'

type CalendarDays = {
  month?: number
}

export function CalendarDays({ month = 0 }: CalendarDays) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const {
    dates,
    onSelectDates,
    startSelectedDate,
    endSelectedDate,
    disableDates,
    disableFutureDates,
    disablePastDates,
    disableWeekends,
  } = React.useContext(CalendarContext)

  return (
    <Grid sx={styles.days}>
      {dates[month].days.map((day, index) => {
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
          (isBefore(day, startOfMonth(dates[month].startDateOfMonth)) ||
            isAfter(day, endOfMonth(dates[month].startDateOfMonth))) &&
          !isSelected
        ) {
          variant = 'outside'
        }

        const interval =
          startSelectedDate &&
          endSelectedDate &&
          eachDayOfInterval({
            start: startSelectedDate,
            end: endSelectedDate,
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
            onSelectDate={onSelectDates}
          />
        )
      })}
    </Grid>
  )
}
