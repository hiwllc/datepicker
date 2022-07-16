import * as React from 'react'
import { Months, Range } from '../types'

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
