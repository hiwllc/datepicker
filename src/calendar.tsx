import { Box, Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { isAfter, Locale } from 'date-fns'
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

  const styles = useMultiStyleConfig('Calendar', {})

  const selectDateHandler = (date: CalendarDate) => {
    if (singleDateSelection) {
      return onSelectDate(date)
    }

    if (value.start && isAfter(date, value.start)) {
      return onSelectDate({ ...value, end: date })
    }

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
          />
        ) : null}
      </Grid>
    </Box>
  )
}
