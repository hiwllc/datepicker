import * as React from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'

type UseCalendar = {
  /**
   * The initial date that calendar will use to render the first month.
   * @default Date
   */
  initialDate?: Date | number
  /**
   * The number of months that you want to render.
   * @default 1
   */
  months?: number
}

export function useCalendar({
  initialDate = new Date(),
  months = 1,
}: UseCalendar = {}) {
  const [state, setState] = React.useState(initialDate)

  const onPrevMonth = React.useCallback(
    () => setState(() => subMonths(state, 1)),
    [state]
  )

  const onNextMonth = React.useCallback(
    () => setState(() => addMonths(state, 1)),
    [state]
  )

  const dates = React.useMemo(() => {
    return [...Array(months).keys()].map(index => {
      const currentMonth = addMonths(state, index)

      const firstDayOfMonth = startOfMonth(currentMonth)
      const lastDayOfMonth = endOfMonth(currentMonth)

      const firstWeekDayOfStartOfMonth = startOfWeek(firstDayOfMonth)
      const lastWeekDayOfEndOfMonth = endOfWeek(lastDayOfMonth)

      const days = eachDayOfInterval({
        end: lastWeekDayOfEndOfMonth,
        start: firstWeekDayOfStartOfMonth,
      })

      const name = format(currentMonth, 'MMMM, yyyy')

      return {
        firstDayOfMonth,
        lastDayOfMonth,
        firstWeekDayOfStartOfMonth,
        lastWeekDayOfEndOfMonth,
        days,
        name,
        number: index,
      }
    })
  }, [state, months])

  const getCalendarProps = React.useCallback(() => {
    return {
      initialDate: state,
      months: dates,
      value: null,
      onSelectDates: () => null,
      onNextMonth,
      onPrevMonth,
    }
  }, [state, dates, onNextMonth, onPrevMonth])

  return {
    getCalendarProps,
    onPrevMonth,
    onNextMonth,
  }
}
