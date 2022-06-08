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
import { MonthContext } from './month'

export function CalendarDays({ children }: CalendarDayProps) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const { dates } = React.useContext(CalendarContext)
  const { month } = React.useContext(MonthContext)

  return (
    <Grid sx={styles.days}>
      {dates[Number(month)].days.map((day, index) => (
        <DayContext.Provider
          value={{ day }}
          key={day ? format(day, 'd-M') : `not-a-day-${index}`}
        >
          <CalendarDay>{children}</CalendarDay>
        </DayContext.Provider>
      ))}
    </Grid>
  )
}

export type CalendarDayContext = {
  day: CalendarContext['dates'][number]['days'][number]
}

export const DayContext = React.createContext<CalendarDayContext>({ day: 0 })

export interface CalendarDayProps {
  children?: React.ReactNode | ((props: CalendarDayContext) => React.ReactNode)
}

export function CalendarDay({ children }: CalendarDayProps) {
  const { onSelectDates } = React.useContext(CalendarContext)
  const { day } = React.useContext(DayContext)
  const { variant, isDisabled } = useCalendarDay()

  if (!day) {
    return <span />
  }

  return (
    <Day
      variant={variant}
      day={day}
      disabled={isDisabled}
      onSelectDate={onSelectDates}
    >
      {typeof children === 'function' ? children({ day }) : children}
    </Day>
  ) as JSX.Element
}

export const useCalendarDay = () => {
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
  const { day } = React.useContext(DayContext)

  if (!day) return {}

  let variant: 'selected' | 'range' | 'outside' | 'today' | undefined

  const isSelected =
    (startSelectedDate && isSameDay(day, startSelectedDate)) ||
    (endSelectedDate && isSameDay(day, endSelectedDate))

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
    (disablePastDates &&
      isBefore(
        day,
        disablePastDates instanceof Date ? disablePastDates : new Date()
      )) ||
    (disableFutureDates &&
      isAfter(
        day,
        disableFutureDates instanceof Date ? disableFutureDates : new Date()
      )) ||
    (disableWeekends && isWeekend(day)) ||
    (disableDates && disableDates.some(date => isSameDay(day, date)))

  return {
    day,
    variant,
    isSelected,
    interval,
    isInRange,
    isDisabled,
    onSelectDates,
  }
}
