import { createContext, PropsWithChildren, useContext } from 'react'

type CalendarAdapterProps<TLocale> = {
  locale?: TLocale
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export type AdapterFormats = {
  weekday: string
  month: string
  monthDay: string
  day: string
}

export type CalendarAdapter<TDate, TLocale = void> = (
  props: CalendarAdapterProps<TLocale>
) => {
  defaultFormats: AdapterFormats
  today: TDate
  isValid: (v: TDate | undefined) => boolean
  addMonths: (v: TDate, amount: number) => TDate
  addDays: (v: TDate, amount: number) => TDate
  startOfMonth: (v: TDate) => TDate
  endOfMonth: (v: TDate) => TDate
  startOfWeek: (v: TDate) => TDate
  endOfWeek: (v: TDate) => TDate
  daysInRange: (start: TDate, end: TDate) => TDate[]
  removeOutMonthDays: (days: TDate[], date: TDate) => Array<TDate | null>
  weekdays: (format?: string) => string[]
  format: (
    v: TDate,
    formatKey: keyof AdapterFormats,
    formatString?: string
  ) => string
  isBefore: (value: TDate, comparing: TDate) => boolean
  isAfter: (value: TDate, comparing: TDate) => boolean
  isSameDay: (value: TDate, comparing: TDate) => boolean
  isToday: (value: TDate) => boolean
  isWeekend: (value: TDate) => boolean
  differenceInMonths: (value: TDate, comparing: TDate) => number
}

export type CalendarAdapterContextType<TDate, TLocale> = {
  adapter: CalendarAdapter<TDate, TLocale>
}

export const CalendarAdapterContext = createContext<CalendarAdapterContextType<
  any,
  any
> | null>(null)

export const CalendarAdapterProvider = <TDate, TLocale>(
  props: PropsWithChildren<CalendarAdapterContextType<TDate, TLocale>>
) => {
  const { adapter, children } = props

  const contextValue: CalendarAdapterContextType<TDate, TLocale> = {
    adapter,
  }

  return (
    <CalendarAdapterContext.Provider value={contextValue}>
      {children}
    </CalendarAdapterContext.Provider>
  )
}

export const useAdapter = <TDate, TLocale>(
  props: CalendarAdapterProps<TLocale>
) => {
  const adapterContext = useContext<CalendarAdapterContextType<
    TDate,
    TLocale
  > | null>(CalendarAdapterContext)

  if (adapterContext === null) {
    throw new Error(
      'It looks like you forgot to wrap your component in CalendarAdapterProvider.'
    )
  }

  if (!adapterContext.adapter) {
    throw new Error(
      'It looks like you forgot to pass a `adapter` to your CalendarAdapterProvider.'
    )
  }

  return adapterContext.adapter({
    locale: props.locale,
    weekStartsOn: props.weekStartsOn,
  })
}
