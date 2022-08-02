import { Locale } from 'date-fns'
import * as React from 'react'
import { CalendarProvider } from '../providers/calendar'
import { Months, Range } from '../types'

export type CalendarProps = React.PropsWithChildren<{
  disableFutureDates?: boolean
  disablePastDates?: boolean
  locale?: Locale
  months: Months
  onNextMonth: VoidFunction
  onPrevMonth: VoidFunction
  onSelectDate: (date: Date) => void
  selected: Range | Date | null
  weekday?: string
}>

export function Calendar({
  children,
  disableFutureDates,
  disablePastDates,
  locale,
  months,
  onNextMonth,
  onPrevMonth,
  onSelectDate,
  selected,
  weekday,
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
      disableFutureDates={disableFutureDates}
      disablePastDates={disablePastDates}
    >
      {children}
    </CalendarProvider>
  )
}
