import { useState } from 'react'
import {
  endOfMonth,
  startOfMonth,
  eachDayOfInterval,
  addMonths,
  startOfWeek,
  isSameMonth,
  subMonths,
} from 'date-fns'

export type CalendarDate = Date | number

type UseCalendar = {
  start: CalendarDate
}

function replaceOutMonthDays(days: CalendarDate[], date: CalendarDate) {
  return days.map(d => (isSameMonth(date, d) ? d : null))
}

export function useCalendar({ start }: UseCalendar) {
  const [date, setDate] = useState<CalendarDate>(start)

  const startDateStartOfMonth = startOfMonth(date)
  const startDateEndOfMonth = endOfMonth(date)
  const startDateMonthStarOftWeek = startOfWeek(startDateStartOfMonth)

  const startDateDays = eachDayOfInterval({
    start: startDateMonthStarOftWeek,
    end: startDateEndOfMonth,
  })

  const endDate = addMonths(date, 1)

  const endDateStartOfMonth = startOfMonth(endDate)
  const endDateEndOfMonth = endOfMonth(endDate)
  const endDateMonthStarOftWeek = startOfWeek(endDateStartOfMonth)

  const endDateDays = eachDayOfInterval({
    start: endDateMonthStarOftWeek,
    end: endDateEndOfMonth,
  })

  const nextMonth = () => setDate(() => addMonths(date, 1))
  const prevMonth = () => setDate(() => subMonths(date, 1))

  return {
    startDate: date,
    endDate,
    startDateDays: replaceOutMonthDays(startDateDays, date),
    endDateDays: replaceOutMonthDays(endDateDays, endDate),
    nextMonth,
    prevMonth,
  }
}
