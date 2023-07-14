import { CalendarAdapter } from './adapters'
import { createContext, useContext } from 'react'

export type CalendarContextType<TDate, TLocale> = {
  dates: {
    startDateOfMonth: TDate
    endDateOfMonth: TDate
    startWeek: TDate
    endWeek: TDate
    days: (TDate | null)[]
  }[]
  nextMonth: VoidFunction
  prevMonth: VoidFunction
  onSelectDates: (date: TDate) => void
  startSelectedDate?: TDate
  endSelectedDate?: TDate
  allowOutsideDays?: boolean
  disablePastDates?: boolean | TDate
  disableFutureDates?: boolean | TDate
  disableWeekends?: boolean
  disableDates?: TDate[]
  locale?: TLocale
  weekdayFormat?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  highlightToday?: boolean
  adapter: ReturnType<CalendarAdapter<TDate, TLocale>>
}

export const CalendarContext = createContext<CalendarContextType<
  any,
  any
> | null>(null)

export const useCalendarContext = <TDate, TLocale>() => {
  const calendarContext = useContext<CalendarContextType<
    TDate,
    TLocale
  > | null>(CalendarContext)

  if (calendarContext === null) {
    throw new Error('Something went wrong')
  }

  return calendarContext
}
