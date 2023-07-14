import { useMemo, useState } from 'react'
import { CalendarAdapter } from './adapters'

export type UseCalendarProps<TDate, TLocale> = {
  start: TDate
  blockFuture?: boolean
  allowOutsideDays?: boolean
  months?: number
  adapter: ReturnType<CalendarAdapter<TDate, TLocale>>
}

export function useCalendar<TDate, TLocale>({
  start,
  months = 1,
  blockFuture,
  allowOutsideDays,
  adapter,
}: UseCalendarProps<TDate, TLocale>) {
  const initialState = blockFuture ? adapter.addMonths(start, -1) : start

  const [date, setDate] = useState(initialState)

  const actions = useMemo(
    function actionsFn() {
      const nextMonth = () => setDate(prevSet => adapter.addMonths(prevSet, 1))
      const prevMonth = () => setDate(prevSet => adapter.addMonths(prevSet, -1))
      const resetDate = () => setDate(initialState)

      const dates = [...Array(months).keys()].map(i => {
        const month = adapter.addMonths(date, i)

        const startDateOfMonth = adapter.startOfMonth(month)
        const endDateOfMonth = adapter.endOfMonth(month)
        const startWeek = adapter.startOfWeek(startDateOfMonth)
        const endWeek = adapter.endOfWeek(endDateOfMonth)
        const days = adapter.daysInRange(startWeek, endWeek)

        return {
          startDateOfMonth,
          endDateOfMonth,
          startWeek,
          endWeek,
          days: allowOutsideDays
            ? days
            : adapter.removeOutMonthDays(days, month),
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
