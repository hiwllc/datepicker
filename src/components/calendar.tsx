import { Locale } from 'date-fns'
import * as React from 'react'
import { CalendarProvider } from '../providers/calendar'
import { Months, Range } from '../types'

export type CalendarProps = React.PropsWithChildren<{
  months: Months
  onNextMonth: VoidFunction
  onPrevMonth: VoidFunction
  onSelectDate: (date: Date) => void
  selected: Range | Date | null
  locale?: Locale
  weekday?: string
  disablePastDates?: boolean
}>

export function Calendar({
  children,
  months,
  onNextMonth,
  onPrevMonth,
  onSelectDate,
  selected,
  locale,
  weekday,
  disablePastDates,
}: CalendarProps) {
  return (
    <CalendarProvider
      months={months}
      onNextMonth={onNextMonth}
      onPrevMonth={onPrevMonth}
      onSelectDate={onSelectDate}
      selected={selected}
      locale={locale}
      weekday={weekday}
      disablePastDates={disablePastDates}
    >
      {children}
    </CalendarProvider>
  )
}
