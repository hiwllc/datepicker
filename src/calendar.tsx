import { Flex, useMultiStyleConfig } from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { CalendarAdapter, useAdapter } from './adapters'
import { CalendarContext } from './context'
import { CalendarStyles, Target } from './types'
import { useCalendar } from './useCalendar'

export type CustomSelectHandler<TDate, TValue> = (
  value: TDate,
  meta: {
    currentValue: TValue
    onSelectDate: (value: TValue) => void
    adapter: ReturnType<CalendarAdapter<TDate>>
    target: Target
    changeTarget: (t: Target) => void
  }
) => void

type BaseCalendarProps<TDate, TLocale = void> = {
  months?: number
  locale?: TLocale
  allowOutsideDays?: boolean
  disablePastDates?: boolean | TDate
  disableFutureDates?: boolean | TDate
  disableWeekends?: boolean
  disableDates?: TDate[]
  weekdayFormat?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  highlightToday?: boolean
  allowSelectSameDay?: boolean
  customSelectHandler?: CustomSelectHandler<
    TDate,
    CalendarSingleDate<TDate> | CalendarDateRange<TDate>
  >
}

export type CalendarSingleDate<TDate> = TDate | null | undefined

export type SingleCalendarProps<TDate, TLocale = void> = BaseCalendarProps<
  TDate,
  TLocale
> & {
  value: CalendarSingleDate<TDate>
  onSelectDate: (value: CalendarSingleDate<TDate>) => void
  singleDateSelection: true
  weekDateSelection?: never
}

export type CalendarDateRange<TDate> = {
  start?: TDate | null
  end?: TDate | null
}

export type RangeCalendarProps<TDate, TLocale = void> = BaseCalendarProps<
  TDate,
  TLocale
> & {
  value: CalendarDateRange<TDate>
  onSelectDate: (value: CalendarDateRange<TDate>) => void
  singleDateSelection?: false
  weekDateSelection?: boolean
}

export type CalendarProps<TDate, TLocale = void> =
  | RangeCalendarProps<TDate, TLocale>
  | SingleCalendarProps<TDate, TLocale>

function isSingleMode<TDate, TLocale>(
  props: CalendarProps<TDate, TLocale>
): props is SingleCalendarProps<TDate, TLocale> {
  return !!props.singleDateSelection
}

export function Calendar<TDate, TLocale>(
  props: PropsWithChildren<CalendarProps<TDate, TLocale>>
) {
  const styles = useMultiStyleConfig('Calendar', {}) as CalendarStyles

  const adapter = useAdapter<TDate, TLocale>({
    locale: props.locale,
    weekStartsOn: props.weekStartsOn,
  })

  const { resetDate, ...values } = useCalendar<TDate, TLocale>({
    allowOutsideDays: props.allowOutsideDays,
    blockFuture: props.disableFutureDates,
    start:
      (isSingleMode(props) ? props.value : props.value?.start) || adapter.today,
    months: props.months,
    adapter,
  })

  const target = useRef<Target>(Target.START)

  useEffect(() => {
    const date = isSingleMode(props) ? props.value : props.value?.start
    if (date && adapter.isValid(date)) {
      resetDate()
    }
    // missing resetDate, adding resetDate causes to calendar
    // impossible to navigation through months.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  const selectDateHandler = (date: TDate) => {
    if (props.customSelectHandler) {
      return props.customSelectHandler(date, {
        currentValue: props.value,
        // @ts-expect-error not sure how to pass proper type here
        onSelectDate: props.onSelectDate,
        adapter,
        target: target.current,
        changeTarget: (t: Target) => (target.current = t),
      })
    }

    if (isSingleMode(props)) {
      return props.onSelectDate(date)
    }

    if (props.weekDateSelection) {
      return props.onSelectDate({
        start: adapter.startOfWeek(date),
        end: adapter.endOfWeek(date),
      })
    }

    if (
      !props.allowSelectSameDay &&
      ((props.value?.start && adapter.isSameDay(date, props.value.start)) ||
        (props.value?.end && adapter.isSameDay(date, props.value.end)))
    ) {
      return
    }

    if (props.value?.start && adapter.isBefore(date, props.value.start)) {
      return props.onSelectDate({ ...props.value, start: date })
    }

    if (props.value?.end && adapter.isAfter(date, props.value.end)) {
      return props.onSelectDate({ start: props.value.start, end: date })
    }

    if (target.current === Target.END) {
      target.current = Target.START
      return props.onSelectDate({ start: props.value.start, end: date })
    }

    target.current = Target.END
    return props.onSelectDate({ ...props.value, start: date })
  }

  return (
    <CalendarContext.Provider
      value={{
        ...values,
        onSelectDates: selectDateHandler,
        startSelectedDate: isSingleMode(props)
          ? props.value
          : props.value?.start,
        endSelectedDate: isSingleMode(props) ? props.value : props.value?.end,
        disableDates: props.disableDates,
        disableFutureDates: props.disableFutureDates,
        disablePastDates: props.disablePastDates,
        disableWeekends: props.disableWeekends,
        locale: props.locale,
        weekdayFormat: props.weekdayFormat,
        weekStartsOn: props.weekStartsOn,
        highlightToday: props.highlightToday,
        adapter,
      }}
    >
      <Flex sx={styles.calendar}>{props.children}</Flex>
    </CalendarContext.Provider>
  )
}
