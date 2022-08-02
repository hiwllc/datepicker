import * as React from 'react'
import { eachDayOfInterval, isAfter, isBefore, isSameDay } from 'date-fns'
import { useCalendarContext } from './calendar'
import { Range } from '../types'

export type CalendarDayContext = {
  day: Date | number
}

export const DayContext = React.createContext<CalendarDayContext>({
  day: 0,
})

export function useCalendarDay() {
  const { day } = React.useContext(DayContext)
  const { selected, disablePastDates, disableFutureDates } =
    useCalendarContext()

  const dates = selectedToArray(selected)

  const variant = getVariant({
    day,
    dates: dates as Date[],
    disablePastDates,
    disableFutureDates,
  })

  return {
    day,
    variant,
    disabled: variant === 'disabled',
  }
}

type GetVariant = {
  dates: Date[]
  day: Date | number
  disableFutureDates?: boolean
  disablePastDates?: boolean
}

function getVariant({
  dates,
  day,
  disablePastDates,
  disableFutureDates,
}: GetVariant) {
  if (dates.some(d => isSameDay(day, d))) {
    return 'selected'
  }

  const interval =
    dates[0] &&
    dates[1] &&
    eachDayOfInterval({ start: dates[0], end: dates[1] })

  if (
    (disablePastDates && isBefore(day, new Date())) ||
    (disableFutureDates && isAfter(day, new Date()))
  ) {
    return 'disabled'
  }

  if (interval && interval.some(d => isSameDay(d, day))) {
    return 'range'
  }

  return 'default'
}

function isRange(selected?: Range | Date): selected is Range {
  return !(selected instanceof Date)
}

function selectedToArray(dates?: Range | Date | null) {
  if (!dates) {
    return []
  }

  if (isRange(dates)) {
    return [dates.start, dates.end]
  }

  return [dates]
}
