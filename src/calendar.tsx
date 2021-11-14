import { Box, Grid, useMultiStyleConfig } from '@chakra-ui/react'
import { isAfter } from 'date-fns'
import type { CalendarDate, CalendarValues } from './types'
import { Month } from './month'
import { useCalendar } from './useCalendar'
import { Controls } from './control'

export type Calendar = {
  value: CalendarValues
  onlyOneMonth?: boolean
  singleDateSelection?: boolean
  onSelectDate: (value: CalendarDate | CalendarValues) => void
}

export function Calendar({
  value,
  onlyOneMonth = false,
  singleDateSelection = false,
  onSelectDate,
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
      <Controls prevMonth={prevMonth} nextMonth={nextMonth} />

      <Grid sx={styles.months}>
        <Month
          startSelectedDate={value?.start}
          endSelectedDate={value?.end}
          value={value}
          date={startDate}
          days={startDateDays}
          onSelectDate={selectDateHandler}
        />

        {!onlyOneMonth ? (
          <Month
            startSelectedDate={value?.start}
            endSelectedDate={value?.end}
            value={value}
            date={endDate}
            days={endDateDays}
            onSelectDate={selectDateHandler}
          />
        ) : null}
      </Grid>
    </Box>
  )
}
