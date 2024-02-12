import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  Locale,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import type { CalendarDate } from './types'
import { useMemo, useState } from 'react'

function replaceOutMonthDays(days: CalendarDate[], date: CalendarDate) {
  return days.map(d => (isSameMonth(date, d) ? d : null))
}

export type UseCalendar = {
  start: CalendarDate
  blockFuture?: boolean
  allowOutsideDays?: boolean
  months?: number
  locale?: Locale
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export function useCalendar({
  start,
  months = 1,
  blockFuture,
  allowOutsideDays,
  locale,
  weekStartsOn,
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
        const startWeek = startOfWeek(startDateOfMonth, {
          locale,
          weekStartsOn,
        })
        const endWeek = endOfWeek(endDateOfMonth, { locale, weekStartsOn })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allowOutsideDays, date, initialState, months]
  )

  return {
    startDate: date,
    ...actions,
  }
}
