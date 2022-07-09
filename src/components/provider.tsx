import * as React from 'react'

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
}

export const CalendarContext = React.createContext<CalendarContextProps>({
  months: [],
  onNextMonth: () => null,
  onPrevMonth: () => null,
})

export function CalendarProvider({
  months,
  onNextMonth,
  onPrevMonth,
  ...props
}: React.PropsWithChildren<CalendarContextProps>) {
  return (
    <CalendarContext.Provider
      value={{
        months,
        onNextMonth,
        onPrevMonth,
      }}
      {...props}
    />
  )
}

export function useCalendarContext() {
  return React.useContext(CalendarContext)
}
