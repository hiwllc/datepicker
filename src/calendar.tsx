import * as React from 'react'
import { useMultiStyleConfig, Flex } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { useCalendar } from './useCalendar'
import {
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isValid,
  Locale,
  startOfWeek,
} from 'date-fns'
import { CalendarDate, CalendarStyles, CalendarValues, Target } from './types'

export type Calendar = React.PropsWithChildren<{
  value: CalendarValues
  onSelectDate: (value: CalendarDate | CalendarValues) => void
  months?: number
  locale?: Locale
  allowOutsideDays?: boolean
  disablePastDates?: boolean | Date
  disableFutureDates?: boolean | Date
  disableWeekends?: boolean
  disableDates?: CalendarDate[]
  singleDateSelection?: boolean
  weekdayFormat?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  highlightToday?: boolean
  weekDateSelection?: boolean
}>

export function Calendar({
  children,
  months,
  value,
  allowOutsideDays,
  singleDateSelection,
  disablePastDates,
  disableFutureDates,
  disableWeekends,
  disableDates,
  locale,
  weekdayFormat,
  onSelectDate,
  weekStartsOn,
  weekDateSelection,
  highlightToday,
}: Calendar) {
  const styles = useMultiStyleConfig('Calendar', {}) as CalendarStyles

  const { resetDate, ...values } = useCalendar({
    allowOutsideDays,
    blockFuture: false,
    start: value?.start || new Date(),
    months,
    weekStartsOn,
  })

  const [target, setTarget] = React.useState<Target>(Target.START)

  React.useEffect(() => {
    if (isValid(value.start)) {
      resetDate()
    }
    // missing resetDate, adding resetDate causes to calendar
    // impossible to navigation through months.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.start])

  const selectDateHandler = (date: CalendarDate) => {
    if (singleDateSelection) {
      return onSelectDate(date)
    }

    if (weekDateSelection) {
      return onSelectDate({ start: startOfWeek(date), end: endOfWeek(date) })
    }

    if (
      (value.start && isSameDay(date, value.start)) ||
      (value.end && isSameDay(date, value.end))
    ) {
      return
    }

    if (value.start && isBefore(date, value.start)) {
      return onSelectDate({ ...value, start: date })
    }

    if (value.end && isAfter(date, value.end)) {
      return onSelectDate({ ...value, end: date })
    }

    if (target === Target.END) {
      setTarget(Target.START)
      return onSelectDate({ ...value, end: date })
    }

    setTarget(Target.END)
    return onSelectDate({ ...value, start: date })
  }

  return (
    <CalendarContext.Provider
      value={{
        ...values,
        onSelectDates: selectDateHandler,
        startSelectedDate: value?.start,
        endSelectedDate: value?.end,
        disableDates,
        disableFutureDates,
        disablePastDates,
        disableWeekends,
        locale,
        weekdayFormat,
        weekStartsOn,
        highlightToday,
      }}
    >
      <Flex sx={styles.calendar}>{children}</Flex>
    </CalendarContext.Provider>
  )
}
