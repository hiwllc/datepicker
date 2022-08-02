import * as React from 'react'
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameMonth,
  Locale,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from 'date-fns'
import { enUS } from 'date-fns/locale'
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
  /**
   * The locale for the calendar.
   * @default en-US
   * @see https://date-fns.org/v2.29.1/docs/Locale
   */
  locale?: Locale
  /**
   * Weekday format. This uses the same as date-fns options.
   * @see https://date-fns.org/v2.29.1/docs/format
   */
  weekday?: string
  /**
   * Disable future date from being selected.
   * @default false
   */
  disableFutureDates?: boolean
  /**
   * Disable past date from being selected.
   * @default false
   */
  disablePastDates?: boolean
}

function replaceOutsideDays(days: Date[], date: Date) {
  return days.filter(d => isSameMonth(date, d))
}

export function useCalendar(
  {
    disableFutureDates = false,
    disablePastDates = false,
    initialDate = new Date(),
    locale,
    months = 1,
    singleDateSelection,
    weekday,
  }: UseCalendar = { locale: enUS }
) {
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

  const onPrevYear = React.useCallback(
    () => setState(() => subYears(state, 1)),
    [state]
  )

  const onNextYear = React.useCallback(
    () => setState(() => addYears(state, 1)),
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

      const name = format(currentMonth, 'MMMM, yyyy', { locale })

      return {
        days: replaceOutsideDays(days, currentMonth),
        firstDayOfMonth,
        firstWeekDayOfStartOfMonth,
        lastDayOfMonth,
        lastWeekDayOfEndOfMonth,
        name,
        number: index,
      }
    })
  }, [state, months, locale])

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
      disableFutureDates,
      disablePastDates,
      initialDate: state,
      locale,
      months: dates,
      onNextMonth,
      onNextYear,
      onPrevMonth,
      onPrevYear,
      onSelectDate,
      selected: singleDateSelection ? date : range,
      value: null,
      weekday,
    }
  }, [
    date,
    dates,
    disableFutureDates,
    disablePastDates,
    locale,
    onNextMonth,
    onNextYear,
    onPrevMonth,
    onPrevYear,
    onSelectDate,
    range,
    singleDateSelection,
    state,
    weekday,
  ])

  const getMonthProps = React.useCallback(
    (month = 0) => {
      return { ...dates[month], key: dates[month].name }
    },
    [dates]
  )

  return {
    dates: range,
    getCalendarProps,
    getMonthProps,
    months: dates,
    onNextMonth,
    onNextYear,
    onPrevMonth,
    onPrevYear,
  }
}
