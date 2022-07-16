import * as React from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { Range, RangeSelection, Target } from '../types'

export type UseCalendar = {
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
  /**
   * Allow single date selection.
   * @default false
   */
  singleDateSelection?: boolean
}

function replaceOutsideDays(days: Date[], date: Date) {
  return days.filter(d => isSameMonth(date, d))
}

export function useCalendar({
  initialDate = new Date(),
  months = 1,
  singleDateSelection,
}: UseCalendar = {}) {
  const [state, setState] = React.useState(initialDate)
  const [range, setRange] = React.useState<Range>({
    end: null,
    start: null,
  })
  const [date, setDate] = React.useState<Date | null>(null)

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
        days: replaceOutsideDays(days, currentMonth),
        name,
        number: index,
      }
    })
  }, [state, months])

  const onSelectDates: RangeSelection = ({ end, start }) => {
    setRange({ end, start })
  }

  const onSelectSingleDate = (date: Date) => {
    setDate(date)
  }

  const [target, setTarget] = React.useState<Target>(Target.START)

  const onSelectDate = React.useCallback(
    (date: Date) => {
      if (singleDateSelection) {
        return onSelectSingleDate(date)
      }

      if (range.start && isBefore(date, range.start)) {
        return onSelectDates({ ...range, start: date })
      }

      if (range.end && isAfter(date, range.end)) {
        return onSelectDates({ ...range, end: date })
      }

      if (target === Target.END) {
        setTarget(Target.START)
        return onSelectDates({ ...range, end: date })
      }

      setTarget(Target.END)
      return onSelectDates({ ...range, start: date })
    },
    [range, target, singleDateSelection]
  )

  const getCalendarProps = React.useCallback(() => {
    return {
      initialDate: state,
      months: dates,
      value: null,
      onSelectDate,
      onNextMonth,
      onPrevMonth,
      selected: singleDateSelection ? date : range,
    }
  }, [
    state,
    dates,
    onNextMonth,
    onPrevMonth,
    onSelectDate,
    range,
    singleDateSelection,
    date,
  ])

  const getMonthProps = React.useCallback(
    (month = 0) => {
      return { ...dates[month], key: dates[month].name }
    },
    [dates]
  )

  return {
    getCalendarProps,
    getMonthProps,
    onPrevMonth,
    onNextMonth,
    months: dates,
    dates: range,
  }
}
