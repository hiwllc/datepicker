import * as React from 'react'
import { useMultiStyleConfig, Flex } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { useCalendar } from './useCalendar'
import { CalendarDate, CalendarStyles, CalendarValues, Target } from './types'
import { isAfter, isBefore, isSameDay, isValid } from 'date-fns'

export type Calendar = React.PropsWithChildren<{
  value: CalendarValues
  onSelectDate: (value: CalendarDate | CalendarValues) => void
  months?: number
  allowOutsideDays?: boolean
  disablePastDates?: boolean
  disableFutureDates?: boolean
  disableWeekends?: boolean
  disableDates?: CalendarDate[]
  singleDateSelection?: boolean
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
  onSelectDate,
}: Calendar) {
  const styles = useMultiStyleConfig('Calendar', {}) as CalendarStyles

  const { resetDate, ...values } = useCalendar({
    allowOutsideDays,
    blockFuture: false,
    start: value?.start || new Date(),
    months,
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
      }}
    >
      <Flex sx={styles.calendar}>{children}</Flex>
    </CalendarContext.Provider>
  )
}
