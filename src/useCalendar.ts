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
  months?: number
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export function useCalendar({
  start,
  months = 1,
  blockFuture,
  allowOutsideDays,
  weekStartsOn = 0,
}: UseCalendar) {
  const initialState = blockFuture ? subMonths(start, 1) : start
  const [date, setDate] = useState<CalendarDate>(initialState)

  const actions = useMemo(
    function actionsFn() {
      const nextMonth = () => setDate(prevSet => addMonths(prevSet, 1))
      const prevMonth = () => setDate(prevSet => subMonths(prevSet, 1))

      const resetDate = () => setDate(initialState)

      const dates = [...Array(months).keys()].map(i => {
        const month = addMonths(date, i)

        const startDateOfMonth = startOfMonth(month)
        const endDateOfMonth = endOfMonth(month)
        const startWeek = startOfWeek(startDateOfMonth, { weekStartsOn })
        const endWeek = endOfWeek(endDateOfMonth, { weekStartsOn })
        const days = eachDayOfInterval({ start: startWeek, end: endWeek })

        return {
          startDateOfMonth,
          endDateOfMonth,
          startWeek,
          endWeek,
          days: allowOutsideDays ? days : replaceOutMonthDays(days, month),
        }
      })

      return {
        nextMonth,
        prevMonth,
        resetDate,
        dates,
      }
    },
    [allowOutsideDays, date, initialState, months]
  )

  return {
    startDate: date,
    ...actions,
  }
}
