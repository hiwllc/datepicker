import { Locale } from 'date-fns'
import { enUS } from 'date-fns/locale'
import * as React from 'react'
import { Months, Range } from '../types'

export type CalendarContextProps = {
  months: Months
  onNextMonth: VoidFunction
  onPrevMonth: VoidFunction
  onSelectDate: (date: Date) => void
  selected?: Range | Date | null
  locale?: Locale
  weekday?: string
}

export const CalendarContext = React.createContext<CalendarContextProps>({
  months: [],
  onNextMonth: () => null,
  onPrevMonth: () => null,
  onSelectDate: () => null,
  locale: enUS,
})

export function CalendarProvider({
  months,
  onNextMonth,
  onPrevMonth,
  onSelectDate,
  selected,
  locale,
  weekday,
  ...props
}: React.PropsWithChildren<CalendarContextProps>) {
  return (
    <CalendarContext.Provider
      value={{
        months,
        onNextMonth,
        onPrevMonth,
        onSelectDate,
        selected,
        locale,
        weekday,
      }}
      {...props}
    />
  )
}

export function useCalendarContext() {
  return React.useContext(CalendarContext)
}
