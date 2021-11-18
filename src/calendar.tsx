import { useState } from 'react'
import { Box, Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { isAfter, isBefore, isSameDay, Locale } from 'date-fns'
import { Target } from './types'
import type { CalendarDate, CalendarValues, Buttons } from './types'
import { Month } from './month'
import { useCalendar } from './useCalendar'
import { Controls } from './control'

export type Calendar = {
  value: CalendarValues
  onlyOneMonth?: boolean
  singleDateSelection?: boolean
  locale?: Locale
  monthYearFormat?: string
  weekdayFormat?: string
  blockPastDates?: boolean
  onSelectDate: (value: CalendarDate | CalendarValues) => void
  nextButton?: Buttons
  prevButton?: Buttons
}

export function Calendar({
  value,
  onlyOneMonth = false,
  singleDateSelection = false,
  locale,
  monthYearFormat = 'MMMM, yyyy',
  weekdayFormat = 'E',
  blockPastDates = false,
  onSelectDate,
  nextButton,
  prevButton,
}: Calendar) {
  const {
    startDateDays,
    endDateDays,
    startDate,
    endDate,
    nextMonth,
    prevMonth,
  } = useCalendar({
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
          blockPastDates={blockPastDates}
        />

        {!onlyOneMonth ? (
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
            blockPastDates={blockPastDates}
          />
        ) : null}
      </Grid>
    </Box>
  )
}
