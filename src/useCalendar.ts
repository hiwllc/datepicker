import { useState, useMemo } from 'react'
import {
  endOfMonth,
  startOfMonth,
  eachDayOfInterval,
  addMonths,
  startOfWeek,
  isSameMonth,
  subMonths,
  endOfWeek,
} from 'date-fns'
import type { CalendarDate } from './types'

function replaceOutMonthDays(days: CalendarDate[], date: CalendarDate) {
  return days.map(d => (isSameMonth(date, d) ? d : null))
}

export type UseCalendar = {
  start: CalendarDate
  blockFuture?: boolean
  allowOutsideDays?: boolean
}

export function useCalendar({
  start,
  blockFuture,
  allowOutsideDays,
}: UseCalendar) {
  const initialState = blockFuture ? subMonths(start, 1) : start
  const [date, setDate] = useState<CalendarDate>(initialState)

  const startDateStartOfMonth = startOfMonth(date)
  const startDateEndOfMonth = endOfMonth(date)
  const startDateMonthStarOftWeek = startOfWeek(startDateStartOfMonth)
  const startDateMonthEndOfWeek = endOfWeek(startDateEndOfMonth)

  const endDate = addMonths(date, 1)

  const endDateStartOfMonth = startOfMonth(endDate)
  const endDateEndOfMonth = endOfMonth(endDate)
  const endDateMonthStarOftWeek = startOfWeek(endDateStartOfMonth)
  const endDateMonthEndOfWeek = endOfWeek(endDateEndOfMonth)

  const actions = useMemo(
    function actionsFn() {
      const nextMonth = () => setDate(prevSet => addMonths(prevSet, 1))
      const prevMonth = () => setDate(prevSet => subMonths(prevSet, 1))

      const startDateDays = eachDayOfInterval({
        start: startDateMonthStarOftWeek,
        end: startDateMonthEndOfWeek,
      })

      const endDateDays = eachDayOfInterval({
        start: endDateMonthStarOftWeek,
        end: endDateMonthEndOfWeek,
      })

      const resetDate = () => setDate(initialState)

      return {
        startDateDays: allowOutsideDays
          ? startDateDays
          : replaceOutMonthDays(startDateDays, date),
        endDateDays: allowOutsideDays
          ? endDateDays
          : replaceOutMonthDays(endDateDays, endDate),
        nextMonth,
        prevMonth,
        resetDate,
      }
    },
    [
      allowOutsideDays,
      date,
      endDate,
      endDateMonthEndOfWeek,
      endDateMonthStarOftWeek,
      initialState,
      startDateMonthEndOfWeek,
      startDateMonthStarOftWeek,
    ]
  )

  return {
    startDate: date,
    endDate,
    ...actions,
  }
}
