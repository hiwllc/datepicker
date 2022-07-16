import * as React from 'react'
import { eachDayOfInterval, isSameDay } from 'date-fns'
import { useCalendarContext } from './calendar'
import { Range } from '../types'

export type CalendarDayContext = {
  day: Date | number
}

export const DayContext = React.createContext<CalendarDayContext>({
  day: 0,
})

function isRange(selected?: Range | Date): selected is Range {
  return !(selected instanceof Date)
}

function getVariant(day: Date, dates: Date[]) {
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

  return 'default'
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

export function useCalendarDay() {
  const { day } = React.useContext(DayContext)
  const { selected } = useCalendarContext()

  const dates = selectedToArray(selected)

  const variant = getVariant(day as Date, dates as Date[])

  return {
    day,
    variant,
  }
}
