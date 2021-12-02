import { ReactNode, useState } from 'react'
import { Box, Grid, useMultiStyleConfig, Flex } from '@chakra-ui/react'
import { isAfter, isBefore, isSameDay, Locale } from 'date-fns'
import { Target } from './types'
import type { CalendarDate, CalendarValues, Buttons } from './types'
import { Month } from './month'
import { useCalendar } from './useCalendar'
import { Controls } from './control'

export type Calendar = {
  value: CalendarValues
  singleMonth?: boolean
  singleDateSelection?: boolean
  locale?: Locale
  monthYearFormat?: string
  weekdayFormat?: string
  disablePastDates?: boolean
  disableFutureDates?: boolean
  disableWeekends?: boolean
  disableDates?: CalendarDate[]
  allowOutsideDays?: boolean
  onSelectDate: (value: CalendarDate | CalendarValues) => void
  nextButton?: Buttons
  prevButton?: Buttons
  children?: ReactNode
}

export function Calendar({
  value,
  singleMonth = false,
  singleDateSelection = false,
  locale,
  monthYearFormat = 'MMMM, yyyy',
  weekdayFormat = 'E',
  disablePastDates = false,
  disableFutureDates = false,
  disableWeekends = false,
  disableDates,
  allowOutsideDays = false,
  onSelectDate,
  nextButton,
  prevButton,
  children,
}: Calendar) {
  const {
    startDateDays,
    endDateDays,
    startDate,
    endDate,
    nextMonth,
    prevMonth,
  } = useCalendar({
    allowOutsideDays: allowOutsideDays && singleMonth,
    blockFuture: disableFutureDates,
    start: value?.start || new Date(),
  })

  const [target, setTarget] = useState<Target>(Target.START)

  const styles = useMultiStyleConfig('Calendar', {})

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
    <Box sx={styles.calendar}>
      <Flex>
        <Box position="relative">
          <Controls
            prevButton={prevButton}
            nextButton={nextButton}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />

          <Grid sx={styles.months}>
            <Month
              locale={locale}
              startSelectedDate={value?.start}
              endSelectedDate={value?.end}
              value={value}
              date={startDate}
              days={startDateDays}
              monthYearFormat={monthYearFormat}
              weekdayFormat={weekdayFormat}
              onSelectDate={selectDateHandler}
              disablePastDates={disablePastDates}
              disableFutureDates={disableFutureDates}
              disableWeekends={disableWeekends}
              disableDates={disableDates}
            />

            {!singleMonth ? (
              <Month
                locale={locale}
                startSelectedDate={value?.start}
                endSelectedDate={value?.end}
                value={value}
                date={endDate}
                days={endDateDays}
                monthYearFormat={monthYearFormat}
                weekdayFormat={weekdayFormat}
                onSelectDate={selectDateHandler}
                disablePastDates={disablePastDates}
                disableFutureDates={disableFutureDates}
                disableWeekends={disableWeekends}
                disableDates={disableDates}
              />
            ) : null}
          </Grid>
        </Box>

        {children ? <Box>{children}</Box> : null}
      </Flex>
    </Box>
  )
}
