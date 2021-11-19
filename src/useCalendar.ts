import { useState } from 'react'
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
  const [date, setDate] = useState<CalendarDate>(
    blockFuture ? subMonths(start, 1) : start
  )

  const startDateStartOfMonth = startOfMonth(date)
  const startDateEndOfMonth = endOfMonth(date)
  const startDateMonthStarOftWeek = startOfWeek(startDateStartOfMonth)
  const startDateMonthEndOfWeek = endOfWeek(startDateEndOfMonth)

  const startDateDays = eachDayOfInterval({
    start: startDateMonthStarOftWeek,
    end: startDateMonthEndOfWeek,
  })

  const endDate = addMonths(date, 1)

  const endDateStartOfMonth = startOfMonth(endDate)
  const endDateEndOfMonth = endOfMonth(endDate)
  const endDateMonthStarOftWeek = startOfWeek(endDateStartOfMonth)
  const endDateMonthEndOfWeek = endOfWeek(endDateEndOfMonth)

  const endDateDays = eachDayOfInterval({
    start: endDateMonthStarOftWeek,
    end: endDateMonthEndOfWeek,
  })

  const nextMonth = () => setDate(() => addMonths(date, 1))
  const prevMonth = () => setDate(() => subMonths(date, 1))

  return {
    startDate: date,
    endDate,
    startDateDays: allowOutsideDays
      ? startDateDays
      : replaceOutMonthDays(startDateDays, date),
    endDateDays: allowOutsideDays
      ? endDateDays
      : replaceOutMonthDays(endDateDays, endDate),
    nextMonth,
    prevMonth,
  }
}
