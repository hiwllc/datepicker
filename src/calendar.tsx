import { useMultiStyleConfig, Flex } from '@chakra-ui/react'
import { CalendarContextDJ } from './context'
import { useCalendarDJ } from './useCalendar'
import { CalendarStyles, Target } from './types'
import { useAdapter } from './adapters'
import { useState, PropsWithChildren, useEffect } from 'react'

type BaseCalendarDJ<TDate, TLocale = void> = {
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

export type SingleCalendarDJ<TDate, TLocale = void> = BaseCalendarDJ<
  TDate,
  TLocale
> & {
  value: TDate
  onSelectDate: (value: TDate) => void
  singleDateSelection: true
  weekDateSelection?: never
}

export type MultipleCalendarDJ<TDate, TLocale = void> = BaseCalendarDJ<
  TDate,
  TLocale
> & {
  value: { start?: TDate; end?: TDate }
  onSelectDate: (value: { start: TDate; end?: TDate }) => void
  singleDateSelection?: false
  weekDateSelection?: boolean
}

type CalendarDJProps<TDate, TLocale = void> =
  | SingleCalendarDJ<TDate, TLocale>
  | MultipleCalendarDJ<TDate, TLocale>

function isMultiMode<TDate, TLocale>(
  props: CalendarDJProps<TDate, TLocale>
): props is MultipleCalendarDJ<TDate, TLocale> {
  return !props.singleDateSelection
}

function isSingleMode<TDate, TLocale>(
  props: CalendarDJProps<TDate, TLocale>
): props is SingleCalendarDJ<TDate, TLocale> {
  return !!props.singleDateSelection
}

export function CalendarDJ<TDate, TLocale>(
  props: PropsWithChildren<CalendarDJProps<TDate, TLocale>>
) {
  const styles = useMultiStyleConfig('Calendar', {}) as CalendarStyles

  const adapter = useAdapter<TDate, TLocale>({
    locale: props.locale,
    weekStartsOn: props.weekStartsOn,
  })

  const { resetDate, ...values } = useCalendarDJ<TDate, TLocale>({
    allowOutsideDays: props.allowOutsideDays,
    blockFuture: false,
    start:
      (isMultiMode(props) ? props.value.start : props.value) || adapter.today,
    months: props.months,
    adapter,
  })

  const [target, setTarget] = useState<Target>(Target.START)

  useEffect(() => {
    if (adapter.isValid(isMultiMode(props) ? props.value.start : props.value)) {
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
      ((props.value.start && adapter.isSameDay(date, props.value.start)) ||
        (props.value.end && adapter.isSameDay(date, props.value.end)))
    ) {
      return
    }

    if (props.value.start && adapter.isBefore(date, props.value.start)) {
      return props.onSelectDate({ ...props.value, start: date })
    }

    if (props.value.end && adapter.isAfter(date, props.value.end)) {
      return props.onSelectDate({ ...props.value, end: date })
    }

    if (target === Target.END) {
      setTarget(Target.START)
      return props.onSelectDate({ ...props.value, end: date })
    }

    console.log('start')

    setTarget(Target.END)
    return props.onSelectDate({ ...props.value, start: date })
  }

  return (
    <CalendarContextDJ.Provider
      value={{
        ...values,
        onSelectDates: selectDateHandler,
        startSelectedDate: isMultiMode(props)
          ? props.value?.start
          : props.value,
        endSelectedDate: isMultiMode(props) ? props.value?.end : props.value,
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
    </CalendarContextDJ.Provider>
  )
}
