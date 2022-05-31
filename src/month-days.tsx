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
import type { CalendarDate, CalendarMonthStyles } from './types'
import { CalendarContext } from './context'
import { Day, DayVariant } from './day'
import { MonthContext } from './month'

export function CalendarDays({
  getVariant,
}: {
  getVariant?: (args: GetVariantArgs) => DayVariant
}) {
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
    highlightToday,
  } = React.useContext(CalendarContext)
  const { month } = React.useContext(MonthContext)

  return (
    <Grid sx={styles.days}>
      {dates[Number(month)].days.map((day, index) => {
        if (!day) {
          return <span key={`not-a-day-${index}`} />
        }

        let variant: DayVariant

        const isSelected = Boolean(
          (startSelectedDate && isSameDay(day, startSelectedDate)) ||
            (endSelectedDate && isSameDay(day, endSelectedDate))
        )

        if (isSelected) {
          variant = 'selected'
        }

        if (
          (isBefore(day, startOfMonth(dates[Number(month)].startDateOfMonth)) ||
            isAfter(day, endOfMonth(dates[Number(month)].startDateOfMonth))) &&
          !isSelected
        ) {
          variant = 'outside'
        }

        if (highlightToday && isSameDay(new Date(), day)) {
          variant = 'today'
        }

        const interval = (startSelectedDate &&
          endSelectedDate &&
          eachDayOfInterval({
            start: startSelectedDate,
            end: endSelectedDate,
          })) as Date[]

        const isInRange = interval
          ? interval.some(date => isSameDay(day, date))
          : false

        if (isInRange && !isSelected) {
          variant = 'range'
        }

        const isDisabled = Boolean(
          (disablePastDates &&
            isBefore(
              day,
              disablePastDates instanceof Date ? disablePastDates : new Date()
            )) ||
            (disableFutureDates &&
              isAfter(
                day,
                disableFutureDates instanceof Date
                  ? disableFutureDates
                  : new Date()
              )) ||
            (disableWeekends && isWeekend(day)) ||
            (disableDates && disableDates.some(date => isSameDay(day, date)))
        )

        const key = format(day, 'd-M')
        if (getVariant) {
          variant = getVariant({
            day,
            index,
            key,
            interval,
            isDisabled,
            isSelected,
            isInRange,
            variant,
          })
        }

        return (
          <Day
            variant={variant as Day['variant']}
            day={day}
            key={key}
            disabled={isDisabled}
            onSelectDate={onSelectDates}
          />
        )
      })}
    </Grid>
  )
}

export interface GetVariantArgs {
  day: CalendarDate
  index: number
  key: string
  interval: Date[]
  isDisabled: boolean
  isSelected: boolean
  isInRange: boolean
  variant: DayVariant
}
