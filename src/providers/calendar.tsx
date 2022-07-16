import * as React from 'react'
import { Range } from '../hooks/use-calendar'

export type Month = {
  days: Date[]
  firstDayOfMonth: Date | number
  lastDayOfMonth: Date | number
  firstWeekDayOfStartOfMonth: Date | number
  lastWeekDayOfEndOfMonth: Date | number
  name: string
  number?: number
}

export type Months = Month[]

export type CalendarContextProps = {
  months: Months
  onNextMonth: VoidFunction
  onPrevMonth: VoidFunction
  onSelectDate: (date: Date) => void
  selected?: Range | Date
}

export const CalendarContext = React.createContext<CalendarContextProps>({
  months: [],
  onNextMonth: () => null,
  onPrevMonth: () => null,
  onSelectDate: () => null,
})

export function CalendarProvider({
  months,
  onNextMonth,
  onPrevMonth,
  onSelectDate,
  selected,
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
      }}
      {...props}
    />
  )
}

export function useCalendarContext() {
  return React.useContext(CalendarContext)
}
