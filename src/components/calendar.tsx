import { Locale } from 'date-fns'
import * as React from 'react'
import { CalendarProvider } from '../providers/calendar'
import { Months, Range } from '../types'

export type CalendarProps = React.PropsWithChildren<{
  disableDates?: Date[]
  disableFutureDates?: boolean
  disablePastDates?: boolean
  disableWeekends?: boolean
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
  disableDates,
  disableFutureDates,
  disablePastDates,
  disableWeekends,
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
      disableDates={disableDates}
      disableFutureDates={disableFutureDates}
      disablePastDates={disablePastDates}
      disableWeekends={disableWeekends}
      locale={locale}
      months={months}
      onNextMonth={onNextMonth}
      onPrevMonth={onPrevMonth}
      onSelectDate={onSelectDate}
      selected={selected}
      weekday={weekday}
    >
      {children}
    </CalendarProvider>
  )
}
