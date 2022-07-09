import * as React from 'react'
import { CalendarProvider, Months } from './provider'

export type CalendarProps = React.PropsWithChildren<{
  months: Months
  onNextMonth: VoidFunction
  onPrevMonth: VoidFunction
}>

export function Calendar({
  children,
  months,
  onNextMonth,
  onPrevMonth,
}: CalendarProps) {
  return (
    <CalendarProvider
      months={months}
      onNextMonth={onNextMonth}
      onPrevMonth={onPrevMonth}
    >
      {children}
    </CalendarProvider>
  )
}
