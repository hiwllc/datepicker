import { useMultiStyleConfig, Flex } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { useCalendar } from './useCalendar'
import { CalendarStyles, Target } from './types'
import { useAdapter } from './adapters'
import { useState, PropsWithChildren, useEffect } from 'react'

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
    blockFuture: false,
    start:
      (isSingleMode(props) ? props.value : props.value?.start) || adapter.today,
    months: props.months,
    adapter,
  })

  const [target, setTarget] = useState<Target>(Target.START)

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

    if (target === Target.END) {
      setTarget(Target.START)
      return props.onSelectDate({ start: props.value.start, end: date })
    }

    setTarget(Target.END)
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
