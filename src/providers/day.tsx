import * as React from 'react'
import {
  eachDayOfInterval,
  isAfter,
  isBefore,
  isSameDay,
  isWeekend,
} from 'date-fns'
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
  const {
    disableDates,
    disablePastDates,
    disableFutureDates,
    disableWeekends,
    selected,
  } = useCalendarContext()

  const dates = selectedToArray(selected)

  const variant = React.useMemo(
    () =>
      getVariant({
        dates: dates as Date[],
        day,
        disableDates,
        disableFutureDates,
        disablePastDates,
        disableWeekends,
      }),
    [
      dates,
      day,
      disableDates,
      disableFutureDates,
      disablePastDates,
      disableWeekends,
    ]
  )

  const disabled = React.useMemo(
    () =>
      isDisabled({
        day,
        disableDates,
        disableFutureDates,
        disablePastDates,
        disableWeekends,
      }),
    [day, disableDates, disableFutureDates, disablePastDates, disableWeekends]
  )

  return {
    day,
    variant,
    disabled,
  }
}

type GetVariant = {
  dates: Date[]
  day: Date | number
  disableDates?: Date[]
  disableFutureDates?: boolean
  disablePastDates?: boolean
  disableWeekends?: boolean
}

function isDisabled({
  disableDates,
  disableFutureDates,
  disableWeekends,
  disablePastDates,
  day,
}: Omit<GetVariant, 'dates'>) {
  return (
    (disablePastDates && isBefore(day, new Date())) ||
    (disableFutureDates && isAfter(day, new Date())) ||
    (disableDates && disableDates.some(d => isSameDay(day, d))) ||
    (disableWeekends && isWeekend(day))
  )
}

function getVariant({
  dates,
  day,
  disableDates,
  disablePastDates,
  disableFutureDates,
  disableWeekends,
}: GetVariant) {
  if (dates.some(d => isSameDay(day, d))) {
    return 'selected'
  }

  const interval =
    dates[0] &&
    dates[1] &&
    eachDayOfInterval({ start: dates[0], end: dates[1] })

  if (interval && interval.some(d => isSameDay(d, day))) {
    return 'range'
  }

  if (
    isDisabled({
      disableDates,
      disableFutureDates,
      disablePastDates,
      disableWeekends,
      day,
    })
  ) {
    return 'disabled'
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
